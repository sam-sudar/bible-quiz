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
      <main className="min-h-screen flex items-center justify-center text-white bg-red-900">
        <h1 className="text-3xl font-bold">Invalid question index</h1>
      </main>
    );
  }

  const handleAnswer = (option) => {
    if (correctSelected || selectedOptions.includes(option)) return;

    setPaused(true); // Stop timer
    if (option === question.correct) {
      correctSound.current?.play();
      setCorrectSelected(true);
    } else {
      // Re-play buzz sound on every wrong attempt
      if (wrongSound.current) {
        wrongSound.current.pause();
        wrongSound.current.currentTime = 0;
        wrongSound.current.play();
      }

      setSelectedOptions((prev) => [...prev, option]);
      setShowReveal(true);
      setShakeOption(option);

      // Remove shake after animation duration
      setTimeout(() => setShakeOption(null), 600);
    }
  };

  const handleTimeUp = () => {
    if (!correctSelected) {
      if (wrongSound.current) {
        wrongSound.current.pause();
        wrongSound.current.currentTime = 0;
        wrongSound.current.play();
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
      className={`min-h-screen px-4 py-8 text-white transition-all duration-500 ${
        correctSelected ? "bg-green-900" : "bg-gradient-to-br "
      }`}
    >
      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={confirmEndQuiz}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          End Quiz
        </button>
        <div className="flex gap-4">
          {showReveal && !correctSelected && (
            <button
              onClick={revealCorrectAnswer}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full shadow"
            >
              Reveal Answer
            </button>
          )}
          {correctSelected && (
            <button
              onClick={goToNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-md border border-yellow-300 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-4xl font-title font-semibold text-center mb-6">
          {question.question}
        </h2>

        <div className="flex justify-center mt-6">
          <CountdownTimer
            key={currentIndex}
            duration={15}
            onComplete={handleTimeUp}
            paused={paused}
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {question.options.map((opt, idx) => {
          const isWrong = selectedOptions.includes(opt);
          const isCorrect = opt === question.correct && correctSelected;
          const isDisabled = isWrong || isCorrect;

          let buttonClass =
            "bg-gradient-to-br from-yellow-300 to-yellow-500 text-black hover:scale-105";

          if (isCorrect) buttonClass = "bg-green-600 text-white";
          else if (isWrong) buttonClass = "bg-red-600 text-white";
          if (shakeOption === opt) buttonClass += " animate-shake";

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className={`py-8 w-full text-2xl font-semibold rounded-2xl shadow-xl transition-all duration-300 ${buttonClass}`}
              disabled={isDisabled}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* End Quiz Confirmation */}
      {showEndPopup && (
        <ConfirmModal
          title="Are you sure you want to end the quiz?"
          onConfirm={confirmEnd}
          onCancel={() => setShowConfirm(false)}
        />
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
