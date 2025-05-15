import { FaCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/axiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const ExamLive = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [stream, setStream] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState([]);

  // console.log("final question", savedQuestions);

  const { data: singleExam = {}, isLoading } = useQuery({
    queryKey: ["singleExam", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/exam/${id}`);
      return res.data;
    },
  });

  // console.log(singleExam?.uniqueQuestions);

  // Utility: Shuffle array
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Save shuffled or original questions to DB
  const prepareExam = async () => {
    try {
      const res = await axiosSecure.get(
        `/get/saved-exam/${id}?email=${user.email}`
      );
      if (res.data?.questions?.length > 0) {
        // console.log("as it it found:", res.data);
        setSavedQuestions(res.data.questions);
        return;
      }

      let questionsToSave = singleExam.questions;
      // console.log("as it is from single exam", questionsToSave);

      if (singleExam.uniqueQuestions) {
        // console.log("hit the condition");
        questionsToSave = shuffleArray(questionsToSave);
      }

      const saveRes = await axiosSecure.post("/submit/exam", {
        create_at: new Date(),
        examId: id,
        email: user.email,
        questions: questionsToSave,
        status: "pending",
      });
      // console.log(saveRes?.data);

      if (saveRes.data.insertedId) {
        // console.log(saveRes?.data);
        setSavedQuestions(questionsToSave);
      }
    } catch (err) {
      console.error("Error preparing exam:", err);
    }
  };

  // Auto-start logic
  useEffect(() => {
    if (singleExam?.examTitle && !started) {
      prepareExam(); // Fetch or save questions before starting

      if (singleExam.faceCam) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((mediaStream) => {
            setStream(mediaStream);
            const videoElement = document.getElementById("face-cam-video");
            if (videoElement) {
              videoElement.srcObject = mediaStream;
            }
          })
          .catch((err) => {
            console.error("Camera access denied", err);
          });
      }

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setStarted(true);
            setTimeLeft(parseInt(singleExam.duration) * 60);
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [singleExam, started]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const currentQuestion = savedQuestions?.[currentQuestionIndex];

  const handleAnswerChange = (option) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = option;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex]) {
      if (currentQuestionIndex < savedQuestions?.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handleSubmitExam = () => {
    Swal.fire({
      title: "Are you sure to submit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setExamSubmitted(true);
        const submitData = {
          modified_at: new Date(),
          answers,
        };

        axiosSecure
          .patch(`/submit/exam?id=${id}&email=${user?.email}`, { submitData })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Submitted!",
                "Your exam has been submitted.",
                "success"
              );
              navigate("/dashboard/my-exam");
            }
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "There was an error submitting your exam.",
              "error"
            );
          });
      }
    });
  };

  if (isLoading)
    return <div className="text-center py-10">Loading exam...</div>;

  if (!singleExam?.examTitle)
    return (
      <div className="text-center py-10 text-red-500">Exam not found.</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center text-textColor">
          {singleExam.examTitle}
        </h1>

        {!started && countdown > 0 ? (
          <div className="text-center text-2xl font-semibold text-textLightPrimary">
            {countdown === 3 && "Get Ready! Exam will start soon..."}
            {countdown === 2 && "Stay Focused. Preparing your exam..."}
            {countdown === 1 && "Starting Exam Now!"}
          </div>
        ) : started ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base lg:text-xl font-semibold text-primaryColor">
                Exam Started
              </h2>
              <span className="font-mono text-lg text-accentColor">
                {formatTime(timeLeft)}
              </span>
            </div>

            {singleExam?.faceCam && (
              <div className="flex justify-end">
                <video
                  id="face-cam-video"
                  autoPlay
                  muted
                  className="w-40 h-32 border rounded shadow"
                ></video>
              </div>
            )}

            {currentQuestion && (
              <div className="p-4 border border-gray-300 rounded-xl bg-secondaryColor">
                <p className="font-medium text-lg mb-2">
                  Question {currentQuestionIndex + 1} of {savedQuestions.length}
                </p>
                <p className="text-gray-800 font-semibold mb-4">
                  {currentQuestionIndex + 1}. {currentQuestion.question}
                </p>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  {["A", "B", "C", "D"].map((option) => (
                    <div
                      key={option}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-primaryColor/10 transition ${
                        answers[currentQuestionIndex] === option
                          ? "bg-primaryColor/10 border-primaryColor"
                          : "bg-white border-gray-300"
                      }`}
                      onClick={() => handleAnswerChange(option)}
                    >
                      <div className="flex items-center">
                        {answers[currentQuestionIndex] === option && (
                          <FaCheck className="text-green-600 mr-2" />
                        )}
                        <span className="font-medium text-lg">
                          {currentQuestion[option.toLowerCase()]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentQuestionIndex < savedQuestions?.length - 1 && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestionIndex]}
                  className="px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryDarker btn"
                >
                  Next
                </button>
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={handleSubmitExam}
                disabled={answers.length < 0}
                className="px-6 py-3 bg-accentColor text-white rounded-lg btn hover:bg-accentColor"
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ExamLive;
