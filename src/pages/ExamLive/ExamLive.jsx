import { FaCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/axiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import FaceDirectionDetector from "./FaceDirectionDetector/FaceDirectionDetector";

const ExamLive = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [tryLeft, setTryLeft] = useState(3);

  // tracks if the effect ran already

  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
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

  const autoSubmitExam = useCallback(
    async (
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
        if (!silent) {
          Swal.fire(
            "Submission Error",
            "There was an error submitting your exam.",
            "error"
          );
        }
      }
    },
    [answers, axiosSecure, id, user?.email, navigate]
  );

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

  const prepareExam = useCallback(async () => {
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
  }, [axiosSecure, id, user?.email, singleExam]);

  useEffect(() => {
    if (singleExam?.examTitle && !started) {
      prepareExam();

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
  }, [singleExam, started, prepareExam]);

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
  }, [started, timeLeft, autoSubmitExam]);

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
  }, [started, answers, id, user?.email, axiosSecure, autoSubmitExam]);

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
  }, [answers, autoSubmitExam]);

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
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-200 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-primaryColor drop-shadow-sm">
          {singleExam.examTitle}
        </h1>

        {/* Countdown */}
        {!started && countdown > 0 ? (
          <div className="text-center text-2xl font-semibold text-textLightPrimary animate-pulse">
            {countdown === 3 && "🎯 Get Ready! Exam will start soon..."}
            {countdown === 2 && "💡 Stay Focused. Preparing your exam..."}
            {countdown === 1 && "🚀 Starting Exam Now!"}
          </div>
        ) : started ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Info and Face Cam */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
                <h2 className="text-lg font-semibold text-primaryColor">
                  ✅ Exam Started
                </h2>
                {singleExam?.faceCam && (
                  <p className="text-sm md:text-base text-gray-700">
                    <strong>Violations Left:</strong>{" "}
                    <span className="text-red-600 font-bold">{tryLeft}</span>
                  </p>
                )}
                <p className="font-mono text-xl text-accentColor">
                  ⏰ {formatTime(timeLeft)}
                </p>
              </div>

              {singleExam?.faceCam && (
                <div className="w-full md:h-64 rounded-xl overflow-hidden hidden lg:block bg-white">
                  <FaceDirectionDetector
                    tryLeft={tryLeft}
                    setTryLeft={setTryLeft}
                    autoSubmitExam={autoSubmitExam}
                  />
                </div>
              )}
            </div>

            {/* Right Panel: Quiz Area */}
            <div className="lg:col-span-2 space-y-6">
              {currentQuestion && (
                <div className="p-6 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur shadow-inner">
                  <p className="font-medium text-lg mb-3">
                    Question {currentQuestionIndex + 1} of{" "}
                    {savedQuestions.length}
                  </p>
                  <p className="text-gray-900 font-semibold mb-5 text-xl">
                    {currentQuestionIndex + 1}.{" "}
                    {currentQuestion.question || currentQuestion.Question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["a", "b", "c", "d"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleAnswerChange(option)}
                        className={`p-4 rounded-xl border transition cursor-pointer hover:scale-[1.01] hover:shadow-md ${
                          answers[currentQuestionIndex] === option.toLowerCase()
                            ? "bg-primaryColor/10 border-primaryColor"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <span className="font-bold">{option}.</span>
                          <span>{currentQuestion[option.toLowerCase()]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestionIndex]}
                  className={`btn btn-primary w-full sm:w-auto ${
                    !answers[currentQuestionIndex]
                      ? "btn-disabled opacity-50"
                      : ""
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={handleSubmitExam}
                  disabled={!answers[currentQuestionIndex]}
                  className={`btn btn-success w-full sm:w-auto flex items-center justify-center ${
                    !answers[currentQuestionIndex]
                      ? "btn-disabled opacity-50"
                      : ""
                  }`}
                >
                  Submit Exam <FaCheck className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-xl text-gray-600">
            Preparing your exam...
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamLive;
