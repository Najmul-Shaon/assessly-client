import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const FaceDirectionDetector = ({ autoSubmitExam, setTryLeft, tryLeft }) => {
  if (tryLeft === 0) {
    autoSubmitExam(
      "Cheating Detected!!",
      "Your face moved away from the screen. The exam has been submitted.."
    );
  }

  const webcamRef = useRef(null);
  const [status, setStatus] = useState("Detecting...");

  const detectionRef = useRef(null); // to store requestAnimationFrame id

  const horizontalThreshold = 20;
  const verticalThreshold = 50;

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Adjust path according to your project setup
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models/weights");
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models/weights");
        detectFace();
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    const detectFace = async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;

        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks(true);

        if (detection) {
          analyzeFaceDirection(detection.landmarks);
        } else {
          setStatus("No face detected");
        }
      }

      detectionRef.current = requestAnimationFrame(detectFace);
    };

    const analyzeFaceDirection = (landmarks) => {
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const nose = landmarks.getNose();
      const jaw = landmarks.getJawOutline();

      // Compute eye center X position
      const leftEyeCenterX =
        leftEye.reduce((sum, pt) => sum + pt.x, 0) / leftEye.length;
      const rightEyeCenterX =
        rightEye.reduce((sum, pt) => sum + pt.x, 0) / rightEye.length;
      const eyeCenterX = (leftEyeCenterX + rightEyeCenterX) / 2;

      // Nose tip (landmark 30) is index 3 in the nose array
      const noseTipX = nose[3].x;
      const noseTipY = nose[3].y;

      // Since the webcam is mirrored via CSS, adjust nose X accordingly
      // This mirrors the nose tip horizontally based on eye center
      const adjustedNoseX = 2 * eyeCenterX - noseTipX;

      // Use chin (landmark 8) and middle of jawline (e.g., landmark 3 or 4) for vertical comparisons
      const chinY = jaw[8].y;
      const jawSideY = jaw[3].y; // approximate middle jaw side

      let direction = "Face is Centered";

      // Left / Right detection threshold can be adjusted
      if (adjustedNoseX < eyeCenterX - horizontalThreshold) {
        direction = "Face Turned Left ←";

        // setTryLeft(tryLeft - 1);
        setTryLeft((prev) => prev - 1);
      } else if (adjustedNoseX > eyeCenterX + horizontalThreshold) {
        direction = "Face Turned Right →";

        // setTryLeft(tryLeft - 1);
        setTryLeft((prev) => prev - 1);
      }

      // Up / Down detection based on nose relative to chin and jaw side
      if (noseTipY < jawSideY - verticalThreshold) {
        direction = "Face Looking Up ↑";

        // setTryLeft(tryLeft - 1);
        setTryLeft((prev) => prev - 1);
      } else if (noseTipY > chinY + verticalThreshold) {
        direction = "Face Looking Down ↓";

        // setTryLeft(tryLeft - 1);
        // setTryLeft((prev) => prev - 1);
      }

      setStatus(direction);
    };

    loadModels();

    return () => {
      // Cleanup animation frame on unmount
      if (detectionRef.current) {
        cancelAnimationFrame(detectionRef.current);
      }
    };
  }, [setTryLeft, tryLeft]);

  return (
    <div className="flex justify-center items-center">
      <div style={{ textAlign: "center" }}>
        <Webcam
          ref={webcamRef}
          className="w-[300px] lg:h-[220px] rounded-[32px] scale-x-[-1]"
          mirrored={false}
        />

        {/* <h2>{status}</h2> */}
      </div>
    </div>
  );
};

export default FaceDirectionDetector;
