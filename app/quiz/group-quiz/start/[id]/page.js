"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import groupQuestions from "@/data/group-questions.json";
import CountdownTimer from "@/components/CountdownTimer";

export default function GroupQuizQuestion() {
  const { id } = useParams();
  const router = useRouter();
  const currentIndex = parseInt(id || "0", 10);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(""); // 'correct' or 'wrong'
  const [disabled, setDisabled] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [showQuizEndPopup, setShowQuizEndPopup] = useState(false);

  const correctSound = useRef(null);

  const question = groupQuestions[currentIndex];

  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct.mp3");
  }, []);

  if (!question) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-red-900">
        <h1 className="text-3xl font-bold">Invalid question index</h1>
      </main>
    );
  }

  const handleAnswer = (option) => {
    if (disabled) return;

    setSelected(option);
    setDisabled(true);

    if (option === question.correct) {
      setFeedback("correct");
      correctSound.current?.play();
    } else {
      setFeedback("wrong");
    }
  };

  const handleTimeUp = () => {
    if (!selected) {
      setFeedback("wrong");
      setDisabled(true);
    }
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

  const confirmEndQuiz = () => {
    setShowEndPopup(true);
  };

  const endQuiz = () => {
    setShowEndPopup(false);
    router.push("/quiz");
  };

  return (
    <main
      className={`min-h-screen px-4 py-8 text-white transition-all duration-500 ${
        feedback === "correct"
          ? "bg-green-800"
          : feedback === "wrong"
          ? "bg-red-900"
          : "bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29]"
      }`}
    >
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={confirmEndQuiz}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
        >
          End Quiz
        </button>
        {feedback && (
          <button
            onClick={goToNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
          >
            Next
          </button>
        )}
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-md border border-yellow-300 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-4xl font-title font-semibold text-center mb-6">
          {question.question}
        </h2>

        {/* Timer */}
        <div className="flex justify-center mt-6">
          <CountdownTimer
            key={currentIndex}
            duration={15}
            onComplete={handleTimeUp}
            paused={disabled}
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {question.options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = opt === question.correct;

          let buttonClass =
            "bg-gradient-to-br from-yellow-300 to-yellow-500 text-black hover:scale-105";
          if (isSelected) {
            buttonClass = isCorrect
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white";
          } else if (disabled && isCorrect) {
            buttonClass = "bg-green-600 text-white";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              disabled={disabled && selected}
              className={`py-8 w-full text-2xl font-semibold rounded-2xl shadow-xl transition-all duration-300 ${buttonClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Confirm End Popup */}
      {showEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white text-black rounded-xl p-8 max-w-sm w-full text-center space-y-6 shadow-lg">
            <h2 className="text-2xl font-bold">End Quiz?</h2>
            <p className="text-sm text-gray-700">
              Are you sure you want to end the quiz and return to menu?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={endQuiz}
                className="px-4 py-2 bg-red-500 text-white rounded-full"
              >
                Yes
              </button>
              <button
                onClick={() => setShowEndPopup(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Ended Popup */}
      {showQuizEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white text-black rounded-xl p-8 max-w-sm w-full text-center space-y-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">Quiz Ended</h2>
            <p className="text-sm text-gray-700">
              All questions completed. Returning to menu...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
