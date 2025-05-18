import { FaCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/axiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useIsExamSubmitted from "../../Hooks/useIsExamSubmitted";

const ExamLive = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { isSubmitted } = useIsExamSubmitted(id);

  // const hasHandledSubmission = useRef(false);
  // tracks if the effect ran already
  console.log(isSubmitted);

  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [stream, setStream] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const examSubmittedRef = useRef(false);

  const { data: singleExam = {}, isLoading } = useQuery({
    queryKey: ["singleExam", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/exam/${id}`);
      return res.data;
    },
  });

  // useEffect(() => {
  //   if (isSubmitted) {
  //     Swal.fire({
  //       title: "Already Submitted!",
  //       text: "You already attended this exam.",
  //       icon: "success",
  //     });
  //     navigate("/dashboard/my-exam");
  //   }
  // }, [navigate, isSubmitted]);

  // useEffect(() => {
  //   if (isSubmitted && !hasHandledSubmission.current) {
  //     hasHandledSubmission.current = true; // prevent future triggers

  //     Swal.fire({
  //       title: "Already Submitted!",
  //       text: "You already attended this exam.",
  //       icon: "success",
  //     });

  //     navigate("/dashboard/my-exam");
  //   }
  // }, [isSubmitted, navigate]);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    return () =>
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C", "K", "M"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ["U", "S", "P"].includes(e.key.toUpperCase()))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    examSubmittedRef.current = examSubmitted;
  }, [examSubmitted]);

  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const prepareExam = async () => {
    try {
      const res = await axiosSecure.get(
        `/get/saved-exam/${id}?email=${user.email}`
      );
      if (res.data?.questions?.length > 0) {
        setSavedQuestions(res.data.questions);
        return;
      }

      let questionsToSave = singleExam.questions;
      if (singleExam.uniqueQuestions) {
        questionsToSave = shuffleArray(questionsToSave);
      }

      const saveRes = await axiosSecure.post("/submit/exam", {
        create_at: new Date(),
        examId: id,
        email: user.email,
        questions: questionsToSave,
        status: "pending",
      });

      if (saveRes.data.insertedId) {
        setSavedQuestions(questionsToSave);
      }
    } catch (err) {
      console.error("Error preparing exam:", err);
    }
  };

  useEffect(() => {
    if (singleExam?.examTitle && !started) {
      prepareExam();

      if (singleExam.faceCam) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((mediaStream) => {
            setStream(mediaStream);
            const videoElement = document.getElementById("face-cam-video");
            if (videoElement) videoElement.srcObject = mediaStream;
          })
          .catch((err) => console.error("Camera access denied", err));
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

  // useEffect(() => {
  //   let timer;
  //   if (started && timeLeft > 0) {
  //     timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
  //   }
  //   return () => clearInterval(timer);
  // }, [started, timeLeft]);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            autoSubmitExam(
              "Time Out!",
              "Your time is up. Exam submitted automatically."
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  // Visibility detection (switch tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        started &&
        !examSubmittedRef.current
      ) {
        autoSubmitExam(
          "Cheating Detected!!",
          "You switched tabs. Your exam has been auto-submitted."
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [started, answers, id, user?.email, axiosSecure]);

  // Reload or close tab detection
  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      if (!examSubmittedRef.current) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your exam will be submitted.";
      }
    };

    const unloadHandler = async () => {
      if (!examSubmittedRef.current) {
        await autoSubmitExam(null, null, true); // silent mode
      }
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);
    window.addEventListener("unload", unloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      window.removeEventListener("unload", unloadHandler);
    };
  }, [answers]);

  const autoSubmitExam = async (
    title = "Auto Submitted",
    message = "Exam was submitted automatically.",
    silent = false
  ) => {
    try {
      setExamSubmitted(true);
      const submitData = {
        modified_at: new Date(),
        answers,
      };

      await axiosSecure.patch(`/submit/exam?id=${id}&email=${user?.email}`, {
        submitData,
      });

      if (!silent) {
        await Swal.fire({
          title,
          text: message,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }

      navigate("/dashboard/my-exam");
    } catch (err) {
      console.error("Auto-submit failed", err);
      if (!silent) {
        Swal.fire(
          "Submission Error",
          "There was an error submitting your exam.",
          "error"
        );
      }
    }
  };

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
                />
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
                  {["a", "b", "c", "d"].map((option) => (
                    <div
                      key={option}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-primaryColor/10 transition ${
                        answers[currentQuestionIndex] === option
                          ? "bg-primaryColor/20 border-primaryColor"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleAnswerChange(option)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{option}.</span>
                        <span>{currentQuestion[option.toLowerCase()]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestionIndex]}
                className={`btn btn-primary ${
                  !answers[currentQuestionIndex] ? "btn-disabled" : ""
                }`}
              >
                Next
              </button>
              <button
                onClick={handleSubmitExam}
                disabled={!answers[currentQuestionIndex]}
                className={`btn btn-success flex items-center ${
                  !answers[currentQuestionIndex] ? "btn-disabled" : ""
                }`}
              >
                Submit Exam <FaCheck className="ml-2" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">Preparing your exam...</div>
        )}
      </div>
    </div>
  );
};

export default ExamLive;
