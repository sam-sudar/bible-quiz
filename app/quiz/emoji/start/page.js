"use client";
import { useState } from "react";
import questions from "@/data/emoji-questions.json";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";

export default function EmojiQuizGame() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const question = questions[index];

  const handleEndQuiz = () => setShowConfirm(true);
  const confirmEnd = () => router.push("/quiz");

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
    setTimerEnded(false);
    setPaused(false);
  };

  const handleTimerEnd = () => setTimerEnded(true);

  const bgClass = timerEnded
    ? "bg-gradient-to-br from-[#7f1d1d] via-[#991b1b] to-[#5c0f0f]"
    : "bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29]";

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center text-white px-4 py-10 overflow-hidden transition-colors duration-700 ${bgClass}`}
    >
      {/* End Quiz Button */}
      <button
        onClick={handleEndQuiz}
        className="absolute top-6 right-6 sm:top-8 sm:right-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        End Quiz
      </button>

      {/* Title */}
      <h1 className="text-5xl font-title font-bold text-yellow-300 mb-8">
        Emoji Quiz
      </h1>

      {/* Emoji Card */}
      <div className="rounded-3xl shadow-2xl w-full max-w-xl px-6 py-12 flex flex-col items-center mb-20">
        <div className="text-9xl sm:text-9xl">{question.emojis}</div>
      </div>

      {/* Timer + Buttons */}
      <div className="flex flex-col items-center justify-center space-y-4 sm:w-1/3">
        {!showAnswer && (
          <>
            <CountdownTimer
              duration={30}
              key={index}
              onComplete={handleTimerEnd}
              paused={paused}
            />

            <div className="flex gap-4 text-3xl">
              <button onClick={() => setPaused(true)} title="Pause">
                ⏸️
              </button>
              <button onClick={() => setPaused(false)} title="Resume">
                ▶️
              </button>
            </div>
          </>
        )}

        {/* Answer / Reveal */}
        {showAnswer ? (
          <>
            <div className="text-green-300 text-3xl font-semibold text-center">
              ✅ Answer: {question.answer}
            </div>
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Next Question
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 text-[#1b1b3a] rounded-full hover:scale-105 transition"
          >
            Reveal Answer
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl shadow-xl p-8 max-w-sm text-center space-y-6">
            <h2 className="text-xl font-bold">
              Are you sure you want to end the quiz?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmEnd}
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
