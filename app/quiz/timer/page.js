"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";

export default function CustomTimerPage() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [duration, setDuration] = useState(null);
  const [key, setKey] = useState(0);
  const [started, setStarted] = useState(false);
  const router = useRouter();

  const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

  const startTimer = () => {
    if (totalSeconds > 0) {
      setDuration(totalSeconds);
      setKey((prev) => prev + 1); // to reset timer
      setStarted(true);
    }
  };

  const resetTimer = () => {
    setStarted(false);
    setDuration(null);
    setMinutes(0);
    setSeconds(30);
  };

  const endTimer = () => {
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29] text-white flex flex-col items-center justify-center px-6 py-12 space-y-10">
      <h1 className="text-5xl font-title text-yellow-300 drop-shadow-lg">
        Custom Countdown Timer
      </h1>

      {!started && (
        <div className="flex space-x-4">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-24 p-3 text-xl rounded-md bg-white/10 text-white border border-yellow-300 text-center"
            placeholder="Minutes"
            min="0"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-24 p-3 text-xl rounded-md bg-white/10 text-white border border-yellow-300 text-center"
            placeholder="Seconds"
            min="0"
          />
        </div>
      )}

      {started && duration && (
        <CountdownTimer
          key={key}
          duration={duration}
          onComplete={() => {
            console.log("Time's up!");
            // optional: play sound here
          }}
        />
      )}

      <div className="flex gap-4">
        {!started ? (
          <button
            onClick={startTimer}
            className="px-6 py-3 bg-yellow-300 text-[#1b1b3a] rounded-full hover:bg-yellow-400 transition"
          >
            Start Timer
          </button>
        ) : (
          <>
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Reset
            </button>
            <button
              onClick={endTimer}
              className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              End Timer
            </button>
          </>
        )}
      </div>
    </main>
  );
}
