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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="bg-white/10 backdrop-blur-lg border border-red-400/30 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white">
            Invalid question index
          </h1>
        </div>
      </main>
    );
  }

  const handleAnswer = (option) => {
    if (correctSelected || selectedOptions.includes(option)) return;

    setPaused(true);
    if (option === question.correct) {
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

      setSelectedOptions((prev) => [...prev, option]);
      setShowReveal(true);
      setShakeOption(option);
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

  return (
    <main
      className={`min-h-screen transition-all duration-700 ${
        correctSelected
          ? "bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900"
          : showReveal && !correctSelected
          ? "bg-gradient-to-br from-red-900 via-red-800 to-red-900"
          : "bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse transition-all duration-700 ${
            correctSelected
              ? "bg-emerald-500/20"
              : showReveal && !correctSelected
              ? "bg-red-500/20"
              : "bg-indigo-500/20"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse transition-all duration-700 ${
            correctSelected
              ? "bg-green-500/20"
              : showReveal && !correctSelected
              ? "bg-red-500/20"
              : "bg-blue-500/20"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-700 ${
            correctSelected
              ? "bg-emerald-500/10"
              : showReveal && !correctSelected
              ? "bg-red-500/10"
              : "bg-violet-500/10"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 px-4 py-8 text-white">
        {/* Header with glassmorphism */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1">
            <button
              onClick={confirmEndQuiz}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              End Quiz
            </button>
          </div>

          <div className="flex gap-4">
            {showReveal && !correctSelected && (
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1">
                <button
                  onClick={revealCorrectAnswer}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Reveal Answer
                </button>
              </div>
            )}
            {correctSelected && (
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1">
                <button
                  onClick={goToNext}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Question Card with enhanced glassmorphism */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle animated border glow */}
            <div
              className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-700 ${
                correctSelected
                  ? "bg-gradient-to-r from-emerald-500/20 via-transparent to-green-500/20"
                  : showReveal && !correctSelected
                  ? "bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20"
                  : "bg-gradient-to-r from-indigo-500/20 via-transparent to-violet-500/20"
              }`}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-full px-6 py-3">
                  <span className="text-lg font-semibold text-white">
                    Question {currentIndex + 1} of {groupQuestions.length}
                  </span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                {question.question}
              </h2>
            </div>
          </div>
        </div>

        {/* Timer positioned below question */}
        <div className="flex justify-center mb-10">
          <CountdownTimer
            key={currentIndex}
            duration={15}
            onComplete={handleTimeUp}
            paused={paused}
          />
        </div>

        {/* Options Grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
          {question.options.map((opt, idx) => {
            const isWrong = selectedOptions.includes(opt);
            const isCorrect = opt === question.correct && correctSelected;
            const isDisabled = isWrong || isCorrect;

            let buttonClass =
              "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg border border-indigo-500/30";

            if (isCorrect) {
              buttonClass =
                "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg border border-emerald-500/50";
            } else if (isWrong) {
              buttonClass =
                "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg border border-red-500/50";
            }

            if (shakeOption === opt) buttonClass += " animate-bounce";

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className={`
                  w-full py-6 px-8 text-xl font-semibold rounded-2xl
                  transition-all duration-300 transform
                  ${buttonClass}
                  ${
                    isDisabled
                      ? "cursor-not-allowed opacity-90"
                      : "hover:scale-105"
                  }
                `}
                disabled={isDisabled}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced End Quiz Modal */}
      {showEndPopup && (
        <ConfirmModal
          title="Are you sure you want to end the quiz?"
          onConfirm={confirmEnd}
          onCancel={() => setShowEndPopup(false)}
        />
      )}

      {/* Enhanced Quiz Completion Modal */}
      {showQuizEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl mx-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Quiz Completed!
            </h2>
            <p className="text-white/80">
              All questions completed. Returning to menu...
            </p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>
    </main>
  );
}
