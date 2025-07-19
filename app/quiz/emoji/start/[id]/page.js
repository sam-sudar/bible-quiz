"use client";
import { useParams, useRouter } from "next/navigation";
import questions from "@/data/emoji-questions.json";
import { useEffect, useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import ConfirmModal from "@/components/ConfirmModal";

export default function EmojiQuizById() {
  const { id } = useParams();
  const router = useRouter();

  const index = parseInt(id) || 0;
  const question = questions[index];

  const [showAnswer, setShowAnswer] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [endType, setEndType] = useState("manual"); // or "finished"

  useEffect(() => {
    setShowAnswer(false);
    setTimerEnded(false);
    setPaused(false);
  }, [id]);

  const handleTimerEnd = () => setTimerEnded(true);

  const handleNext = () => {
    const nextIndex = index + 1;

    if (nextIndex >= questions.length) {
      setEndType("finished");
      setShowConfirm(true); // Show end modal if quiz is finished
    } else {
      router.push(`/quiz/emoji/start/${nextIndex}`);
    }
  };

  const confirmEnd = () => router.push("/quiz");

  if (!question) {
    return (
      <div className="text-center text-red-400 text-xl mt-10">
        Invalid Question ID
      </div>
    );
  }

  const bgClass =
    timerEnded && "bg-gradient-to-br from-[#7f1d1d] via-[#991b1b] to-[#5c0f0f]";

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center text-white px-4 py-10 overflow-hidden transition-colors duration-700 ${bgClass}`}
    >
      {/* End Quiz Button */}
      <button
        onClick={() => {
          setEndType("manual");
          setShowConfirm(true);
        }}
        className="absolute top-6 right-6 sm:top-8 sm:right-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        End Quiz
      </button>

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

        {/* Reveal or Show Answer */}
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
        <ConfirmModal
          title={
            endType === "manual"
              ? "Are you sure you want to end the quiz?"
              : "You've finished all questions!"
          }
          onConfirm={confirmEnd}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </main>
  );
}
