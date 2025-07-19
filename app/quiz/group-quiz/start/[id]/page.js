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

  // Enhanced layout for options - Full width usage
  const getOptionsLayout = () => {
    if (englishOptions.length === 3) {
      // 2 on top, 1 on bottom - same size as others
      return (
        <div className="h-full flex flex-col justify-center space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {englishOptions
              .slice(0, 2)
              .map((englishOpt, idx) => renderOption(englishOpt, idx))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Empty space */}
            <div></div>
            {/* Third option - same size */}
            <div>{renderOption(englishOptions[2], 2)}</div>
          </div>
        </div>
      );
    } else {
      // Regular 2x2 grid for 4 options
      return (
        <div className="h-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 w-full">
            {englishOptions.map((englishOpt, idx) =>
              renderOption(englishOpt, idx)
            )}
          </div>
        </div>
      );
    }
  };

  const renderOption = (englishOpt, idx) => {
    const tamilOpt = tamilOptions[idx] || "";
    const isWrong = selectedOptions.some((opt) => opt.en === englishOpt);
    const isCorrect = englishOpt === englishCorrect && correctSelected;
    const isDisabled = isWrong || isCorrect;

    let buttonClass, shadowClass, borderClass;

    if (isCorrect) {
      buttonClass =
        "bg-gradient-to-br from-emerald-500/90 via-teal-500/85 to-cyan-600/90";
      shadowClass = "shadow-emerald-500/40";
      borderClass = "border-emerald-400/60";
    } else if (isWrong) {
      buttonClass =
        "bg-gradient-to-br from-red-500/90 via-pink-500/85 to-rose-600/90";
      shadowClass = "shadow-red-500/40";
      borderClass = "border-red-400/60";
    } else {
      buttonClass =
        "bg-gradient-to-br from-slate-700/70 via-slate-600/80 to-slate-800/90 hover:from-indigo-600/80 hover:via-purple-600/85 hover:to-blue-700/90";
      shadowClass = "hover:shadow-indigo-500/30";
      borderClass = "border-slate-400/30 hover:border-indigo-400/50";
    }

    return (
      <button
        key={idx}
        onClick={() => handleAnswer(englishOpt, tamilOpt)}
        className={`
          group relative overflow-hidden h-24 md:h-28
          backdrop-blur-xl border-2 rounded-xl px-6 py-4
          transition-all duration-500 transform w-full
          ${buttonClass}
          ${shadowClass}
          ${borderClass}
          ${
            isDisabled
              ? "cursor-not-allowed opacity-90"
              : "hover:scale-105 hover:shadow-xl"
          }
          ${shakeOption === englishOpt ? "animate-shake" : ""}
        `}
        disabled={isDisabled}
      >
        {/* Enhanced button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>

        <div className="relative z-10 text-center h-full flex flex-col justify-center space-y-2">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg leading-tight">
            {englishOpt}
          </div>
          <div className="text-base md:text-lg text-slate-200/90 font-tamil font-medium">
            {tamilOpt}
          </div>
        </div>
      </button>
    );
  };

  return (
    <main
      className={`h-screen overflow-hidden transition-all duration-1000 ${
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
              ? "bg-gradient-to-r from-emerald-400/25 to-cyan-400/25"
              : showReveal && !correctSelected
              ? "bg-gradient-to-r from-red-400/25 to-pink-400/25"
              : "bg-gradient-to-r from-purple-400/20 to-blue-400/20"
          }`}
          style={{
            animation: "float 8s ease-in-out infinite",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            correctSelected
              ? "bg-gradient-to-r from-cyan-400/25 to-teal-400/25"
              : showReveal && !correctSelected
              ? "bg-gradient-to-r from-pink-400/25 to-rose-400/25"
              : "bg-gradient-to-r from-indigo-400/20 to-purple-400/20"
          }`}
          style={{
            animation: "float 10s ease-in-out infinite reverse",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      <div className="relative z-10 h-full flex flex-col text-white">
        {/* Compact Header */}
        <div className="flex justify-between items-center p-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl">
            <button
              onClick={confirmEndQuiz}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              End Quiz
            </button>
          </div>

          <div className="flex gap-3">
            {showReveal && !correctSelected && (
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl">
                <button
                  onClick={revealCorrectAnswer}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Reveal Answer
                </button>
              </div>
            )}
            {correctSelected && (
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1 shadow-2xl">
                <button
                  onClick={goToNext}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Question Section - Compact but Visible */}
        <div className="px-6 pb-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border-2 border-white/30 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
            {/* Enhanced animated border effect */}
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
                correctSelected
                  ? "bg-gradient-to-r from-emerald-500/30 via-transparent to-cyan-500/30"
                  : showReveal && !correctSelected
                  ? "bg-gradient-to-r from-red-500/30 via-transparent to-pink-500/30"
                  : "bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20"
              }`}
              style={{
                animation: "pulse 3s ease-in-out infinite",
              }}
            ></div>

            <div className="relative z-10 space-y-3">
              {/* English Question - Smaller but Still Enhanced */}
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-50 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  {englishQuestion}
                </span>
              </h2>

              {/* Tamil Question - Visible */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-xl px-4 py-2 border-2 border-white/30 shadow-xl">
                  <h3 className="text-base md:text-xl lg:text-2xl font-bold text-center font-tamil">
                    <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-lg">
                      {tamilQuestion}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timer - Fixed Position */}
        <div className="flex justify-center pb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-xl border border-white/30 rounded-xl p-2 shadow-xl">
            <CountdownTimer
              key={currentIndex}
              duration={15}
              onComplete={handleTimeUp}
              paused={paused}
            />
          </div>
        </div>

        {/* Options Section - Full Screen Usage */}
        <div className="flex-1 px-4 pb-6">{getOptionsLayout()}</div>
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
