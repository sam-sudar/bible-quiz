"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import groupQuestions from "@/data/group-questions.json";
import CountdownTimer from "@/components/CountdownTimer";
import ConfirmModal from "@/components/ConfirmModal";

export default function GroupQuizQuestion() {
  const { id } = useParams();
  const router = useRouter();
  const currentIndex = parseInt(id || "0", 10);
  const question = groupQuestions[currentIndex];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctSelected, setCorrectSelected] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [showQuizEndPopup, setShowQuizEndPopup] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [shakeOption, setShakeOption] = useState(null);

  const correctSound = useRef(null);
  const wrongSound = useRef(null);
  const confirmEnd = () => router.push("/quiz");

  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct.mp3");
    wrongSound.current = new Audio("/sounds/buzz.mp3");
  }, []);

  if (!question) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Invalid question index
          </h1>
        </div>
      </main>
    );
  }

  // Safely get question data with fallbacks
  const englishQuestion = question.question_en || "";
  const tamilQuestion = question.question_ta || "";
  const englishOptions = question.options_en || [];
  const tamilOptions = question.options_ta || [];
  const englishCorrect = question.correct_en || "";
  const tamilCorrect = question.correct_ta || "";

  const handleAnswer = (englishOption, tamilOption) => {
    if (
      correctSelected ||
      selectedOptions.some((opt) => opt.en === englishOption)
    )
      return;

    setPaused(true);
    if (englishOption === englishCorrect) {
      correctSound.current?.play().catch(() => {
        // Ignore play() errors when user hasn't interacted
      });
      setCorrectSelected(true);
    } else {
      if (wrongSound.current) {
        wrongSound.current.pause();
        wrongSound.current.currentTime = 0;
        wrongSound.current.play().catch(() => {
          // Ignore play() errors when user hasn't interacted
        });
      }

      setSelectedOptions((prev) => [
        ...prev,
        { en: englishOption, ta: tamilOption },
      ]);
      setShowReveal(true);
      setShakeOption(englishOption);
      setTimeout(() => setShakeOption(null), 600);
    }
  };

  const handleTimeUp = () => {
    if (!correctSelected) {
      if (wrongSound.current) {
        wrongSound.current.pause();
        wrongSound.current.currentTime = 0;
        wrongSound.current.play().catch(() => {
          // Ignore play() errors when user hasn't interacted
        });
      }
      setPaused(true);
      setShowReveal(true);
    }
  };

  const revealCorrectAnswer = () => {
    setCorrectSelected(true);
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < groupQuestions.length) {
      router.push(`/quiz/group-quiz/start/${nextIndex}`);
    } else {
      setShowQuizEndPopup(true);
      setTimeout(() => router.push("/quiz"), 2000);
    }
  };

  const confirmEndQuiz = () => setShowEndPopup(true);
  const endQuiz = () => {
    setShowEndPopup(false);
    router.push("/quiz");
  };

  // Dynamic grid layout based on number of options
  const getGridLayout = () => {
    if (englishOptions.length === 4) {
      return "grid-cols-2 gap-4 md:gap-6";
    } else {
      return "grid-cols-1 md:grid-cols-3 gap-4 md:gap-6";
    }
  };

  return (
    <main
      className={`min-h-screen overflow-hidden transition-all duration-1000 ${
        correctSelected
          ? "bg-gradient-to-br from-slate-950 via-emerald-950 to-cyan-950"
          : showReveal && !correctSelected
          ? "bg-gradient-to-br from-slate-950 via-red-950 to-pink-950"
          : "bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950"
      }`}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            correctSelected
              ? "bg-gradient-to-r from-emerald-400/20 to-cyan-400/20"
              : showReveal && !correctSelected
              ? "bg-gradient-to-r from-red-400/20 to-pink-400/20"
              : "bg-gradient-to-r from-purple-400/15 to-blue-400/15"
          }`}
          style={{
            animation: "float 8s ease-in-out infinite",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            correctSelected
              ? "bg-gradient-to-r from-cyan-400/20 to-teal-400/20"
              : showReveal && !correctSelected
              ? "bg-gradient-to-r from-pink-400/20 to-rose-400/20"
              : "bg-gradient-to-r from-indigo-400/15 to-purple-400/15"
          }`}
          style={{
            animation: "float 10s ease-in-out infinite reverse",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className={`absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ${
            correctSelected
              ? "bg-gradient-to-r from-teal-400/15 to-emerald-400/15"
              : showReveal && !correctSelected
              ? "bg-gradient-to-r from-rose-400/15 to-red-400/15"
              : "bg-gradient-to-r from-violet-400/10 to-indigo-400/10"
          }`}
          style={{
            animation: "float 12s ease-in-out infinite",
            animationDelay: "4s",
          }}
        ></div>
      </div>

      <div className="relative z-10 px-4 py-4 text-white h-screen flex flex-col">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl">
            <button
              onClick={confirmEndQuiz}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-red-500/25"
            >
              End Quiz
            </button>
          </div>

          <div className="flex gap-4">
            {showReveal && !correctSelected && (
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl">
                <button
                  onClick={revealCorrectAnswer}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25"
                >
                  Reveal Answer
                </button>
              </div>
            )}
            {correctSelected && (
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl">
                <button
                  onClick={goToNext}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/25"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Question Card */}
        <div className="w-full mb-4 flex-shrink-0">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden mx-4">
            {/* Animated border effect */}
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
                correctSelected
                  ? "bg-gradient-to-r from-emerald-500/20 via-transparent to-cyan-500/20"
                  : showReveal && !correctSelected
                  ? "bg-gradient-to-r from-red-500/20 via-transparent to-pink-500/20"
                  : "bg-gradient-to-r from-purple-500/15 via-transparent to-blue-500/15"
              }`}
              style={{
                animation: "pulse 3s ease-in-out infinite",
              }}
            ></div>

            <div className="relative z-10 space-y-3">
              {/* English Question - Enhanced Typography */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                  {englishQuestion}
                </span>
              </h2>

              {/* Tamil Question - Refined Styling */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20">
                  <h3 className="text-base md:text-lg font-medium text-center font-tamil">
                    <span className="bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
                      {tamilQuestion}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Timer */}
        <div className="flex justify-center mb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-xl border border-white/30 rounded-xl p-2 shadow-2xl">
            <CountdownTimer
              key={currentIndex}
              duration={15}
              onComplete={handleTimeUp}
              paused={paused}
            />
          </div>
        </div>

        {/* Enhanced Options with Dynamic Layout */}
        <div className="flex-1 flex items-center justify-center px-4 min-h-0">
          <div className={`grid ${getGridLayout()} w-full h-full`}>
            {englishOptions.map((englishOpt, idx) => {
              const tamilOpt = tamilOptions[idx] || "";
              const isWrong = selectedOptions.some(
                (opt) => opt.en === englishOpt
              );
              const isCorrect =
                englishOpt === englishCorrect && correctSelected;
              const isDisabled = isWrong || isCorrect;

              let buttonClass =
                "bg-gradient-to-br from-slate-700/80 to-slate-800/80 hover:from-slate-600/90 hover:to-slate-700/90 border-slate-500/40";
              let shadowClass = "hover:shadow-slate-500/20";

              if (isCorrect) {
                buttonClass =
                  "bg-gradient-to-br from-emerald-600/90 to-teal-700/90 border-emerald-500/50";
                shadowClass = "shadow-emerald-500/30";
              } else if (isWrong) {
                buttonClass =
                  "bg-gradient-to-br from-red-600/90 to-pink-700/90 border-red-500/50";
                shadowClass = "shadow-red-500/30";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(englishOpt, tamilOpt)}
                  className={`
                    group relative overflow-hidden min-h-[120px] md:min-h-[140px]
                    backdrop-blur-xl border-2 rounded-2xl p-4 md:p-6
                    transition-all duration-500 transform
                    ${buttonClass}
                    ${shadowClass}
                    ${
                      isDisabled
                        ? "cursor-not-allowed opacity-90"
                        : "hover:scale-105 hover:shadow-2xl"
                    }
                    ${shakeOption === englishOpt ? "animate-shake" : ""}
                  `}
                  disabled={isDisabled}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative z-10 text-center space-y-2 h-full flex flex-col justify-center">
                    <div className="text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-lg">
                      {englishOpt}
                    </div>
                    <div className="text-sm md:text-base text-slate-300 font-tamil font-medium">
                      {tamilOpt}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Modals */}
      {showEndPopup && (
        <ConfirmModal
          title="Are you sure you want to end the quiz?"
          onConfirm={confirmEnd}
          onCancel={() => setShowEndPopup(false)}
        />
      )}

      {showQuizEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-lg z-50">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/30 text-white rounded-3xl p-10 max-w-md w-full text-center space-y-8 shadow-2xl mx-4">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Quiz Completed!
            </h2>
            <p className="text-slate-300 text-lg">
              All questions completed. Returning to menu...
            </p>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-3 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-8px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(8px);
          }
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }

        .font-tamil {
          font-family: "Noto Sans Tamil", "Tamil Sangam MN", "Lohit Tamil",
            sans-serif;
        }
      `}</style>
    </main>
  );
}
