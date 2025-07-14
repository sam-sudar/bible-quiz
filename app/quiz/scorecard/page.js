"use client";
import React, { useState, useEffect } from "react";

const VerticalStandings = () => {
  const [revealedTeams, setRevealedTeams] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);

  // Single round data - replace with your actual data
  const teamData = [
    {
      name: "Alpha Systems",
      score: 850,
      color: "bg-blue-500",
      glowColor: "shadow-blue-500/50",
    },
    {
      name: "Beta Dynamics",
      score: 430,
      color: "bg-red-500",
      glowColor: "shadow-red-500/50",
    },
    {
      name: "Gamma Force",
      score: 720,
      color: "bg-emerald-500",
      glowColor: "shadow-emerald-500/50",
    },
    {
      name: "Delta Prime",
      score: 590,
      color: "bg-purple-500",
      glowColor: "shadow-purple-500/50",
    },
    {
      name: "Epsilon Elite",
      score: 680,
      color: "bg-orange-500",
      glowColor: "shadow-orange-500/50",
    },
  ];

  const sortedTeams = teamData
    .map((team, index) => ({ ...team, originalIndex: index }))
    .sort((a, b) => b.score - a.score);

  const maxScore = Math.max(...teamData.map((t) => t.score));

  useEffect(() => {
    // Show title first
    setTimeout(() => setShowTitle(true), 500);

    // Reveal teams from bottom to top (5th to 1st)
    setTimeout(() => {
      const revealInterval = setInterval(() => {
        setRevealedTeams((prev) => {
          const nextIndex = prev.length;
          if (nextIndex < sortedTeams.length) {
            return [...prev, sortedTeams[sortedTeams.length - 1 - nextIndex]];
          } else {
            clearInterval(revealInterval);
            // Animate bars after all teams are revealed
            setTimeout(() => setBarsAnimated(true), 500);
            return prev;
          }
        });
      }, 800);
    }, 1500);
  }, []);

  const getBarWidth = (score) => {
    return (score / maxScore) * 100;
  };

  const getPositionText = (index) => {
    const position = sortedTeams.length - index;
    if (position === 1) return "1ST";
    if (position === 2) return "2ND";
    if (position === 3) return "3RD";
    return `${position}TH`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5 ">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
            animation: "drift 20s infinite linear",
          }}
        ></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-50 cursor-pointer">
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="group bg-white/10 border border-yellow-300 hover:bg-yellow-300 text-yellow-300 hover:text-slate-900 font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-1"
          >
            ←
          </button>
        </div>
        {/* Header */}
        <div
          className={`text-center py-8 transition-all duration-1000 ${
            showTitle
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-title font-thin tracking-wider mb-4">
            CURRENT{" "}
            <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              STANDINGS
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        {/* Standings Container */}
        <div className="flex-1 flex items-center justify-center px-8 ">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-5 gap-6 h-96">
              {[...Array(5)].map((_, index) => {
                const teamIndex = 4 - index; // Reverse order for bottom-up reveal
                const team = revealedTeams[teamIndex];
                const position = teamIndex + 1;
                const isRevealed = team !== undefined;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col justify-end"
                  >
                    {/* Position Label */}
                    <div
                      className={`text-center mb-4 transition-all duration-700 ${
                        isRevealed
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {isRevealed ? getPositionText(teamIndex) : ""}
                      </div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider">
                        {isRevealed ? "PLACE" : ""}
                      </div>
                    </div>

                    {/* Bar Container */}
                    <div className="relative flex-1 flex flex-col justify-end">
                      {isRevealed && (
                        <>
                          {/* Dramatic entrance effect */}
                          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-t-lg opacity-0 animate-fade-out"></div>

                          {/* Main Bar */}
                          <div
                            className={`${team.color} ${team.glowColor} rounded-t-lg relative overflow-hidden transition-all duration-1000 ease-out transform hover:scale-105`}
                            style={{
                              height: barsAnimated
                                ? `${getBarWidth(team.score)}%`
                                : "0%",
                              minHeight: "60px",
                              transitionDelay: `${teamIndex * 100}ms`,
                            }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse"></div>

                            {/* Flowing animation */}
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
                              style={{
                                animation: `flowVertical 3s infinite linear`,
                                animationDelay: `${teamIndex * 200}ms`,
                              }}
                            ></div>

                            {/* Score Label */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
                              {team.score.toLocaleString()}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Team Name */}
                    <div
                      className={`text-center mt-4 transition-all duration-700 ${
                        isRevealed
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="text-lg font-semibold text-white mb-1">
                        {isRevealed ? team.name : ""}
                      </div>
                      <div className="text-sm text-slate-400">
                        {isRevealed ? `${team.score.toLocaleString()} pts` : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Statistics Footer */}
        {/* <div
          className={`py-6 transition-all duration-1000 ${
            barsAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 px-8">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-white">
                {maxScore.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Highest Score</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-white">
                {Math.round(
                  teamData.reduce((a, b) => a + b.score, 0) / teamData.length
                ).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Average Score</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-white">
                {(
                  maxScore - Math.min(...teamData.map((t) => t.score))
                ).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Score Gap</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes flowVertical {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(-50px) translateY(-50px);
          }
        }

        @keyframes fade-out {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-fade-out {
          animation: fade-out 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VerticalStandings;
