"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import groupQuestions from "@/data/group-questions.json";
import CountdownTimer from "@/components/CountdownTimer";

export default function GroupQuizGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(""); // 'correct' or 'wrong'
  const [disabled, setDisabled] = useState(false);
  const [timeResetKey, setTimeResetKey] = useState(0);
  const router = useRouter();

  const question = groupQuestions[index];

  const handleTimeUp = () => {
    if (!selected) {
      setFeedback("wrong");
      setDisabled(true);
    }
  };

  const handleAnswer = (option) => {
    if (disabled) return;
    setSelected(option);
    setDisabled(true);
    if (option === question.correct) {
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  const nextQuestion = () => {
    setIndex((prev) => (prev + 1) % groupQuestions.length);
    setSelected(null);
    setFeedback("");
    setDisabled(false);
    setTimeResetKey((prev) => prev + 1); // Triggers timer reset
  };

  const endQuiz = () => {
    router.push("/quiz");
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-start px-4 py-10 transition-all duration-500 ${
        feedback === "correct"
          ? "bg-green-800"
          : feedback === "wrong"
          ? "bg-red-900"
          : "bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29]"
      } text-white`}
    >
      {/* End Quiz Button */}
      <button
        onClick={endQuiz}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        End Quiz
      </button>

      {/* Question Box */}
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-yellow-300 rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Timer */}
        <div className="flex justify-center">
          <CountdownTimer
            key={timeResetKey}
            duration={15}
            onComplete={handleTimeUp}
            paused={disabled}
          />
        </div>

        {/* Question */}
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={disabled}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                selected === opt
                  ? feedback === "correct"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-yellow-200 text-black hover:bg-yellow-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Next */}
        {feedback && (
          <button
            onClick={nextQuestion}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Next Question
          </button>
        )}
      </div>
    </main>
  );
}
