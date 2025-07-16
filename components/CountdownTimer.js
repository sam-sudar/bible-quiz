"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer({
  duration,
  onComplete,
  paused = false,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isUrgent, setIsUrgent] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const percentage = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Simulate buzz sound with visual feedback
  const playBuzzSound = () => {
    console.log("🔊 Buzz sound would play here");
    // In your Next.js app, you'd use: new Howl({ src: ["/sounds/buzz.mp3"] }).play();
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setJustCompleted(true);
          setTimeout(() => {
            playBuzzSound();
            onComplete?.();
          }, 0);
          return 0;
        }

        if (prev <= 10 && !isUrgent) {
          setIsUrgent(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paused, isUrgent, onComplete]);

  useEffect(() => {
    setTimeLeft(duration);
    setIsUrgent(false);
    setJustCompleted(false);
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
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className={`absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full transition-all duration-1000 ${
          justCompleted
            ? "animate-ping bg-red-500/30 scale-150"
            : isUrgent
            ? "animate-pulse bg-red-500/20 scale-110"
            : "bg-blue-500/10"
        }`}
      />

      {/* Main timer container */}
      <div
        className={`relative w-36 h-36 sm:w-44 sm:h-44 transform transition-all duration-500 ${
          justCompleted ? "scale-110" : isUrgent ? "scale-105" : "scale-100"
        }`}
      >
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-full" />

        {/* SVG Timer Circle */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
          />

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: isUrgent
                ? "drop-shadow(0 0 8px #ef4444)"
                : "drop-shadow(0 0 6px #3b82f6)",
            }}
          />

          {/* Static dots along the circle */}
          <circle
            cx="92"
            cy="50"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 0 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="85.98"
            cy="75"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 8.33 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="71.65"
            cy="93.3"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 16.66 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="50"
            cy="95"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 25 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="28.35"
            cy="93.3"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 33.33 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="14.02"
            cy="75"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 41.66 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="8"
            cy="50"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 50 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="14.02"
            cy="25"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 58.33 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="28.35"
            cy="6.7"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 66.66 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="50"
            cy="5"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 75 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="71.65"
            cy="6.7"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 83.33 ? "opacity-100" : "opacity-20"
            }`}
          />
          <circle
            cx="85.98"
            cy="25"
            r="1"
            fill={isUrgent ? "#ef4444" : "#3b82f6"}
            className={`transition-all duration-1000 ${
              percentage > 91.66 ? "opacity-100" : "opacity-20"
            }`}
          />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={
                  justCompleted ? "#dc2626" : isUrgent ? "#ef4444" : "#3b82f6"
                }
                className="transition-all duration-1000"
              />
              <stop
                offset="50%"
                stopColor={
                  justCompleted ? "#f59e0b" : isUrgent ? "#f59e0b" : "#8b5cf6"
                }
                className="transition-all duration-1000"
              />
              <stop
                offset="100%"
                stopColor={
                  justCompleted ? "#dc2626" : isUrgent ? "#ef4444" : "#06b6d4"
                }
                className="transition-all duration-1000"
              />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Time display */}
          <div
            className={`text-4xl sm:text-5xl font-bold select-none transition-all duration-500 ${
              justCompleted
                ? "text-red-400 scale-125 animate-bounce"
                : isUrgent
                ? "text-red-300 animate-pulse"
                : "text-white"
            }`}
            style={{
              textShadow: isUrgent
                ? "0 0 20px #ef4444, 0 0 40px #ef4444"
                : "0 0 10px rgba(59, 130, 246, 0.5)",
              fontFamily: "monospace",
            }}
          >
            {formatTime(timeLeft)}
          </div>

          {/* Status indicator */}
          {/* Removed status text as requested */}
        </div>

        {/* Rotating accent ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent transition-all duration-1000 timer-container ${
            isUrgent
              ? "urgent border-t-red-400 border-r-orange-400"
              : "border-t-blue-400 border-r-purple-400"
          }`}
        />

        {/* Pulse rings for dramatic effect */}
        {isUrgent && (
          <>
            <div className="absolute inset-0 rounded-full border border-red-400/50 animate-ping" />
            <div
              className="absolute inset-0 rounded-full border border-orange-400/30 animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}
      </div>

      {/* Completion burst effect */}
      {justCompleted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{ transform: "rotate(0deg) translateY(-60px)" }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(45deg) translateY(-60px)",
              animationDelay: "0.1s",
            }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(90deg) translateY(-60px)",
              animationDelay: "0.2s",
            }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(135deg) translateY(-60px)",
              animationDelay: "0.3s",
            }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(180deg) translateY(-60px)",
              animationDelay: "0.4s",
            }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(225deg) translateY(-60px)",
              animationDelay: "0.5s",
            }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(270deg) translateY(-60px)",
              animationDelay: "0.6s",
            }}
          />
          <div
            className="absolute w-1 h-8 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full animate-ping"
            style={{
              transform: "rotate(315deg) translateY(-60px)",
              animationDelay: "0.7s",
            }}
          />
        </div>
      )}

      <style jsx>{`
        .timer-container {
          animation: spin 8s linear infinite;
        }

        .timer-container.urgent {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
