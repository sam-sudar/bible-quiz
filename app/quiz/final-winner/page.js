"use client";
import React, { useState, useEffect } from "react";
import { Trophy, Crown, Star, Medal, Sparkles } from "lucide-react";

const DramaticScoreboard = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [revealPhase, setRevealPhase] = useState("waiting"); // 'waiting', 'teaser', 'team', 'complete'
  const [finishedPositions, setFinishedPositions] = useState([]);
  const [isRevealing, setIsRevealing] = useState(false);

  // Teams data sorted by ranking (5th to 1st)
  const teams = [
    {
      name: "TEAM PHOENIX",
      points: 2450,
      color: "from-amber-400 via-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-amber-900/20 to-red-900/20",
    },
    {
      name: "TEAM NEBULA",
      points: 2380,
      color: "from-purple-400 via-pink-500 to-red-500",
      bgColor: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
    },
    {
      name: "TEAM QUANTUM",
      points: 2310,
      color: "from-cyan-400 via-blue-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-cyan-900/20 to-blue-900/20",
    },
    {
      name: "TEAM VELOCITY",
      points: 2240,
      color: "from-emerald-400 via-green-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-900/20 to-green-900/20",
    },
    {
      name: "TEAM COSMOS",
      points: 2180,
      color: "from-yellow-300 via-amber-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isRevealing) {
      if (currentPosition < 5) {
        setIsRevealing(true);
        setRevealPhase("teaser");

        // Show teaser for 2 seconds
        setTimeout(() => {
          setRevealPhase("team");
        }, 2000);

        // Show team for 3 seconds, then complete
        setTimeout(() => {
          setRevealPhase("complete");
          setFinishedPositions((prev) => [...prev, currentPosition]);

          // Move to next position after a brief pause
          setTimeout(() => {
            setCurrentPosition((prev) => prev + 1);
            setRevealPhase("waiting");
            setIsRevealing(false);
          }, 500);
        }, 5000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPosition, isRevealing]);

  const getPositionText = (index) => {
    const positions = ["5TH", "4TH", "3RD", "2ND", "1ST"];
    return positions[index];
  };

  const getPositionIcon = (index) => {
    if (index === 4) return <Crown className="w-8 h-8 text-yellow-400" />;
    if (index === 3) return <Trophy className="w-8 h-8 text-gray-300" />;
    if (index === 2) return <Star className="w-8 h-8 text-amber-600" />;
    if (index === 1) return <Medal className="w-6 h-6 text-orange-400" />;
    return <Sparkles className="w-6 h-6 text-blue-400" />;
  };

  const getCurrentTeam = () => teams[currentPosition];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden relative flex">
      {/* Static background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/10 via-transparent to-transparent"></div>

      {/* Side panel for finished positions */}
      <div className="w-80 h-full bg-black/60 backdrop-blur-xl border-r border-gray-700 p-6 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            FINAL RANKINGS
          </h2>
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
        </div>

        <div className="space-y-4 flex-1">
          {finishedPositions.map((posIndex, arrayIndex) => {
            const team = teams[posIndex];
            const displayPosition = getPositionText(posIndex);

            return (
              <div
                key={posIndex}
                className={`relative p-4 rounded-xl bg-gradient-to-r ${team.color} transform transition-all duration-700 shadow-2xl border border-white/20`}
                style={{
                  animation: `slideInLeft 0.8s ease-out ${
                    arrayIndex * 0.2
                  }s both`,
                }}
              >
                <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getPositionIcon(posIndex)}
                    <div>
                      <div className="text-lg font-black tracking-wider text-white">
                        {displayPosition}
                      </div>
                      <div className="text-sm font-bold text-white/90">
                        {team.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-black text-white">
                    {team.points}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main reveal area - centered */}
      <div className="flex-1 flex items-center justify-center h-full">
        {/* Initial state */}
        {currentPosition === 0 && revealPhase === "waiting" && (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl rounded-full"></div>
              <div className="relative z-10 text-6xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                SCOREBOARD
              </div>
            </div>
          </div>
        )}

        {/* Teaser reveal */}
        {currentPosition < 5 && revealPhase === "teaser" && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-3xl font-light text-gray-300 tracking-[0.3em]">
              COMING IN AT
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-orange-600/40 blur-3xl rounded-full"></div>
              <div className="relative z-10 text-8xl font-black tracking-wider bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                {getPositionText(currentPosition)}
              </div>
            </div>
            <div className="text-4xl font-light text-gray-300 tracking-[0.2em]">
              PLACE
            </div>
          </div>
        )}

        {/* Team reveal */}
        {currentPosition < 5 && revealPhase === "team" && (
          <div className="text-center space-y-6 animate-zoom-in">
            <div className="relative">
              <div
                className={`absolute inset-0 ${
                  getCurrentTeam().bgColor
                } blur-3xl rounded-full`}
              ></div>

              <div className="relative z-10 space-y-4">
                <div
                  className={`text-6xl font-black tracking-wider bg-gradient-to-r ${
                    getCurrentTeam().color
                  } bg-clip-text text-transparent`}
                >
                  {getCurrentTeam().name}
                </div>

                <div className="text-5xl font-black text-white">
                  {getCurrentTeam().points} POINTS
                </div>
              </div>

              {/* Special effects for top 3 */}
              {currentPosition >= 3 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"
                        style={{
                          left: `${60 * Math.cos((i * 45 * Math.PI) / 180)}px`,
                          top: `${60 * Math.sin((i * 45 * Math.PI) / 180)}px`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "1.5s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Winner reveal */}
        {currentPosition === 5 && (
          <div className="text-center relative space-y-8 animate-champion-reveal">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/40 via-orange-600/40 to-red-600/40 blur-3xl rounded-full"></div>

            <div className="relative z-10 space-y-6">
              <div className="text-4xl font-light text-gray-300 tracking-[0.2em]">
                AND YOUR CHAMPION IS
              </div>

              <div className="relative">
                <div className="text-7xl font-black tracking-wider bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  🏆 {teams[4].name} 🏆
                </div>
              </div>

              <div className="text-6xl font-black text-white">
                {teams[4].points} POINTS
              </div>

              <div className="text-3xl font-bold text-yellow-400">
                CONGRATULATIONS!
              </div>
            </div>

            {/* Epic celebration effects */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 6}%`,
                    top: `${20 + i * 5}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes champion-reveal {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoom-in 1s ease-out forwards;
        }

        .animate-champion-reveal {
          animation: champion-reveal 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DramaticScoreboard;
