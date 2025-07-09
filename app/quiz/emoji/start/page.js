"use client";
import { useState } from "react";
import questions from "@/data/emoji-questions.json";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function EmojiQuizGame() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [paused, setPaused] = useState(false);
  const router = useRouter();
  const question = questions[index];

  const handleEndQuiz = () => {
    router.push("/quiz");
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
    setTimerEnded(false);
    setPaused(false);
  };

  const handleTimerEnd = () => {
    setTimerEnded(true); // ⛔ Turn background red
  };

  const bgClass = timerEnded
    ? "bg-red-900"
    : "bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29]";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 py-10 overflow-hidden">
      {/* End Quiz Button */}
      <button
        onClick={handleEndQuiz}
        className="absolute top-6 right-6 sm:top-8 sm:right-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        End Quiz
      </button>

      {/* Title */}
      <h1 className="text-5xl font-title text-yellow-300 mb-8">Emoji Quiz</h1>

      {/* Quiz Card */}
      <div className="bg-white/10 backdrop-blur-md border border-yellow-300 rounded-3xl shadow-2xl w-full max-w-xl px-6 py-12 flex flex-col items-center space-y-10">
        {/* Emoji Display */}
        <div className="text-7xl sm:text-8xl">{question.emojis}</div>

        {/* Countdown Timer */}
        {!showAnswer && (
          <CountdownTimer
            duration={30}
            key={index} // reset on next question
            onComplete={handleTimerEnd}
            paused={paused}
          />
        )}

        {/* Pause / Resume Buttons */}
        {!showAnswer && (
          <div className="flex gap-4">
            <button
              onClick={() => setPaused(true)}
              className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
            >
              Pause
            </button>
            <button
              onClick={() => setPaused(false)}
              className="px-4 py-2 bg-yellow-300 text-[#1b1b3a] rounded-full hover:bg-yellow-400 transition"
            >
              Resume
            </button>
          </div>
        )}

        {/* Answer / Buttons */}
        {showAnswer ? (
          <>
            <div className="text-green-300 text-xl font-semibold text-center">
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
            className="mt-4 px-6 py-3 bg-yellow-300 text-[#1b1b3a] rounded-full hover:bg-yellow-400 transition"
          >
            Reveal Answer
          </button>
        )}
      </div>
    </main>
  );
}
