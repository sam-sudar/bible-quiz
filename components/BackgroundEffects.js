"use client";
import React from "react";

const BackgroundEffects = () => {
  const particlePositions = [
    { left: "10%", top: "20%", delay: "0s", duration: "4s" },
    { left: "25%", top: "40%", delay: "1s", duration: "5s" },
    { left: "40%", top: "60%", delay: "2s", duration: "6s" },
    { left: "55%", top: "30%", delay: "3s", duration: "5s" },
    { left: "70%", top: "50%", delay: "1.5s", duration: "4s" },
    { left: "85%", top: "20%", delay: "2.5s", duration: "5.5s" },
  ];

  const crossPositions = [
    { left: "15%", top: "15%", delay: "0s", duration: "6s" },
    { left: "35%", top: "70%", delay: "1s", duration: "5s" },
    { left: "50%", top: "35%", delay: "1.5s", duration: "4s" },
    { left: "65%", top: "65%", delay: "2s", duration: "6s" },
    { left: "80%", top: "25%", delay: "2.5s", duration: "5s" },
  ];

  return (
    <>
      {/* Gradient Overlay */}
      <div className="fixed inset-0 opacity-10 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(59,130,246,0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 70% 30%, rgba(147,51,234,0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Particle Dots */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particlePositions.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Floating Crosses */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        {crossPositions.map((c, i) => (
          <div
            key={i}
            className="absolute text-4xl text-white animate-pulse"
            style={{
              left: c.left,
              top: c.top,
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          >
            ✝
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
