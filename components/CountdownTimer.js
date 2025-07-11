"use client";
import { useEffect, useState } from "react";
import { Howl } from "howler";

export default function CountdownTimer({
  duration,
  onComplete,
  paused = false,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const percentage = (timeLeft / duration) * 100;

  const buzzSound = new Howl({ src: ["/sounds/buzz.mp3"] });

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            buzzSound.play(); // 🔊 Play buzz sound
            onComplete?.();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (seconds) => {
    if (duration < 60) return `${seconds}`;
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div
      className={`relative w-32 h-32 sm:w-40 sm:h-40 ${
        timeLeft <= 5 ? "animate-pulse" : ""
      }`}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#333"
          strokeWidth="10"
          fill="none"
        />

        {/* Countdown Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={`url(#grad${timeLeft <= 5 ? "-urgent" : ""})`}
          strokeWidth="10"
          fill="none"
          strokeDasharray="282.6"
          strokeDashoffset={`${(282.6 * (100 - percentage)) / 100}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="grad-urgent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Text */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-bold select-none transition-all duration-500 ${
          timeLeft === 0
            ? "text-red-400 scale-125 animate-ping"
            : "text-yellow-300"
        }`}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
