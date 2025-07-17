"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";

const QuizWinnersPodium = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightPhase, setSpotlightPhase] = useState(0);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced team data with optimized colors
  const fallbackTeamData = useMemo(
    () => [
      { name: "Group 1", score: 850 },
      { name: "Group 2", score: 430 },
      { name: "Group 3", score: 720 },
      { name: "Group 4", score: 590 },
      { name: "Group 5", score: 680 },
    ],
    []
  );

  // Optimized data fetching
  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.0.104:4000/scores");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTeamData(data.teams);
      setError(null);
    } catch (err) {
      console.error("Error fetching scores:", err);
      setError(err.message);
      setTeamData(fallbackTeamData);
    } finally {
      setLoading(false);
    }
  }, [fallbackTeamData]);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  // Memoized sorted teams
  const sortedTeams = useMemo(() => {
    return teamData
      .map((team, index) => ({ ...team, originalIndex: index }))
      .sort((a, b) => b.score - a.score);
  }, [teamData]);

  // Key press handler with enhanced spotlight sequence
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !loading) {
        if (currentStep < 4) {
          setCurrentStep((prev) => prev + 1);
        } else if (currentStep === 4) {
          // Enhanced spotlight sequence
          setShowSpotlight(true);
          setSpotlightPhase(1);

          // Phase 1: Build suspense
          setTimeout(() => setSpotlightPhase(2), 1000);

          // Phase 2: Intense spotlight
          setTimeout(() => setSpotlightPhase(3), 2000);

          // Phase 3: Reveal
          setTimeout(() => {
            setShowSpotlight(false);
            setCurrentStep(5);
          }, 3500);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, loading]);

  // Enhanced podium heights for better visual impact
  const getPodiumHeight = (position) => {
    const heights = {
      1: 350, // Winner - much taller
      2: 280, // Runner-up - tall
      3: 220, // Third - medium
      4: 120, // Fourth - short
      5: 80, // Fifth - shortest
    };
    return heights[position] || 100;
  };

  // Enhanced position styling with better colors
  const getPositionStyling = (position) => {
    const styles = {
      1: {
        crown: "👑",
        bg: "from-yellow-400 via-yellow-500 to-yellow-600",
        glow: "shadow-[0_0_80px_rgba(251,191,36,0.9)]",
        border: "border-yellow-300",
        text: "text-yellow-100",
        bgOverlay: "bg-gradient-to-t from-yellow-600/20 to-transparent",
        sparkle: true,
      },
      2: {
        crown: "🥈",
        bg: "from-slate-300 via-slate-400 to-slate-500",
        glow: "shadow-[0_0_60px_rgba(148,163,184,0.8)]",
        border: "border-slate-200",
        text: "text-slate-100",
        bgOverlay: "bg-gradient-to-t from-slate-500/20 to-transparent",
        sparkle: true,
      },
      3: {
        crown: "🥉",
        bg: "from-orange-400 via-orange-500 to-orange-600",
        glow: "shadow-[0_0_50px_rgba(251,146,60,0.7)]",
        border: "border-orange-300",
        text: "text-orange-100",
        bgOverlay: "bg-gradient-to-t from-orange-600/20 to-transparent",
        sparkle: false,
      },
      4: {
        crown: "4",
        bg: "from-gray-500 via-gray-600 to-gray-700",
        glow: "shadow-[0_0_30px_rgba(107,114,128,0.5)]",
        border: "border-gray-400",
        text: "text-gray-200",
        bgOverlay: "bg-gradient-to-t from-gray-700/20 to-transparent",
        sparkle: false,
      },
      5: {
        crown: "5",
        bg: "from-gray-600 via-gray-700 to-gray-800",
        glow: "shadow-[0_0_25px_rgba(75,85,99,0.4)]",
        border: "border-gray-500",
        text: "text-gray-300",
        bgOverlay: "bg-gradient-to-t from-gray-800/20 to-transparent",
        sparkle: false,
      },
    };
    return styles[position] || styles[5];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-purple-400/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-yellow-400 animate-spin animation-delay-75"></div>
          </div>
          <p className="text-3xl font-light tracking-wide">
            Preparing Results...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
        <button
          onClick={() => (window.location.href = "/standings")}
          className="group relative overflow-hidden bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 hover:border-purple-400 text-slate-300 hover:text-white font-semibold py-4 px-8 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center text-lg">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Standings
          </span>
        </button>
      </div>

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.2)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2)_0%,transparent_60%)]"></div>
      </div>

      {/* Enhanced Spotlight Effect */}
      {showSpotlight && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              spotlightPhase === 1
                ? "bg-black/60"
                : spotlightPhase === 2
                ? "bg-black/80"
                : "bg-black/90"
            }`}
          ></div>

          {/* Multiple spotlight beams */}
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
              spotlightPhase === 1
                ? "w-96 h-96 opacity-30"
                : spotlightPhase === 2
                ? "w-64 h-64 opacity-60"
                : "w-32 h-32 opacity-90"
            }`}
          >
            <div className="w-full h-full bg-gradient-radial from-yellow-200/40 via-yellow-300/20 to-transparent rounded-full animate-pulse"></div>
          </div>

          <div
            className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
              spotlightPhase >= 2 ? "w-48 h-48 opacity-40" : "w-0 h-0 opacity-0"
            }`}
          >
            <div className="w-full h-full bg-gradient-radial from-white/30 via-yellow-200/20 to-transparent rounded-full animate-ping"></div>
          </div>

          {/* Dramatic text during spotlight */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-500 ${
              spotlightPhase === 2
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div className="text-6xl font-bold text-yellow-300 animate-pulse mb-4">
              THE MOMENT OF TRUTH
            </div>
            <div className="text-2xl text-white/80 animate-bounce">
              ⚡ REVEALING THE CHAMPIONS ⚡
            </div>
          </div>
        </div>
      )}

      {/* Smaller Header */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          QUIZ CHAMPIONS
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto"></div>
      </div>

      {/* Enhanced Podium Container - Full Width */}
      <div className="flex-1 flex items-end justify-center px-4 pb-20 relative z-10">
        <div className="w-full max-w-screen-xl">
          <div className="flex items-end justify-center gap-4 md:gap-8 h-[450px]">
            {/* 5th Place - Enhanced reveal sequence */}
            <div className="relative flex-1 max-w-xs">
              {/* Position text first */}
              <div
                className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  currentStep >= 1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-6xl font-bold text-gray-400 mb-2">5th</div>
                <div className="text-lg text-gray-500 uppercase tracking-widest">
                  PLACE
                </div>
              </div>

              {/* Group name and bar */}
              <div
                className={`transition-all duration-1000 delay-500 ease-out ${
                  currentStep >= 1
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                {currentStep >= 1 && sortedTeams[4] && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">
                      {sortedTeams[4].name}
                    </div>
                    <div
                      className={`bg-gradient-to-t ${
                        getPositionStyling(5).bg
                      } ${
                        getPositionStyling(5).glow
                      } rounded-t-xl relative overflow-hidden border-t-4 ${
                        getPositionStyling(5).border
                      } w-full`}
                      style={{ height: `${getPodiumHeight(5)}px` }}
                    >
                      <div
                        className={`absolute inset-0 ${
                          getPositionStyling(5).bgOverlay
                        }`}
                      ></div>
                      <div
                        className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-4xl font-bold ${
                          getPositionStyling(5).text
                        }`}
                      >
                        {getPositionStyling(5).crown}
                      </div>
                      <div
                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
                          getPositionStyling(5).text
                        } font-bold text-2xl`}
                      >
                        {sortedTeams[4].score.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3rd Place - Enhanced */}
            <div className="relative flex-1 max-w-xs">
              <div
                className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  currentStep >= 3
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-6xl font-bold text-orange-400 mb-2">
                  3rd
                </div>
                <div className="text-lg text-orange-500 uppercase tracking-widest">
                  PLACE
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-500 ease-out ${
                  currentStep >= 3
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                {currentStep >= 3 && sortedTeams[2] && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">
                      {sortedTeams[2].name}
                    </div>
                    <div
                      className={`bg-gradient-to-t ${
                        getPositionStyling(3).bg
                      } ${
                        getPositionStyling(3).glow
                      } rounded-t-xl relative overflow-hidden border-t-4 ${
                        getPositionStyling(3).border
                      } w-full`}
                      style={{ height: `${getPodiumHeight(3)}px` }}
                    >
                      <div
                        className={`absolute inset-0 ${
                          getPositionStyling(3).bgOverlay
                        }`}
                      ></div>
                      <div
                        className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-5xl font-bold ${
                          getPositionStyling(3).text
                        }`}
                      >
                        {getPositionStyling(3).crown}
                      </div>
                      <div
                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
                          getPositionStyling(3).text
                        } font-bold text-2xl`}
                      >
                        {sortedTeams[2].score.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 1st Place - Enhanced Winner */}
            <div className="relative flex-1 max-w-sm">
              <div
                className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  currentStep >= 5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-7xl font-bold text-yellow-400 mb-2 animate-pulse">
                  1st
                </div>
                <div className="text-2xl text-yellow-500 uppercase tracking-widest font-bold">
                  WINNER
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ease-out ${
                  currentStep >= 5
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                {currentStep >= 5 && sortedTeams[0] && (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-4 animate-pulse">
                      {sortedTeams[0].name}
                    </div>
                    <div
                      className={`bg-gradient-to-t ${
                        getPositionStyling(1).bg
                      } ${
                        getPositionStyling(1).glow
                      } rounded-t-xl relative overflow-hidden border-t-4 ${
                        getPositionStyling(1).border
                      } w-full`}
                      style={{ height: `${getPodiumHeight(1)}px` }}
                    >
                      <div
                        className={`absolute inset-0 ${
                          getPositionStyling(1).bgOverlay
                        }`}
                      ></div>

                      {/* Sparkle effect for winner */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300/10 to-transparent animate-pulse"></div>

                      <div
                        className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-6xl font-bold ${
                          getPositionStyling(1).text
                        } animate-bounce`}
                      >
                        {getPositionStyling(1).crown}
                      </div>
                      <div
                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
                          getPositionStyling(1).text
                        } font-bold text-3xl`}
                      >
                        {sortedTeams[0].score.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-6 text-3xl text-yellow-400 font-bold animate-pulse">
                      🏆 CHAMPION! 🏆
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2nd Place - Enhanced */}
            <div className="relative flex-1 max-w-xs">
              <div
                className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  currentStep >= 5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-6xl font-bold text-slate-300 mb-2">
                  2nd
                </div>
                <div className="text-lg text-slate-400 uppercase tracking-widest">
                  PLACE
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-600 ease-out ${
                  currentStep >= 5
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                {currentStep >= 5 && sortedTeams[1] && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">
                      {sortedTeams[1].name}
                    </div>
                    <div
                      className={`bg-gradient-to-t ${
                        getPositionStyling(2).bg
                      } ${
                        getPositionStyling(2).glow
                      } rounded-t-xl relative overflow-hidden border-t-4 ${
                        getPositionStyling(2).border
                      } w-full`}
                      style={{ height: `${getPodiumHeight(2)}px` }}
                    >
                      <div
                        className={`absolute inset-0 ${
                          getPositionStyling(2).bgOverlay
                        }`}
                      ></div>
                      <div
                        className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-5xl font-bold ${
                          getPositionStyling(2).text
                        }`}
                      >
                        {getPositionStyling(2).crown}
                      </div>
                      <div
                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
                          getPositionStyling(2).text
                        } font-bold text-2xl`}
                      >
                        {sortedTeams[1].score.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4th Place - Enhanced */}
            <div className="relative flex-1 max-w-xs">
              <div
                className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  currentStep >= 2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-6xl font-bold text-gray-400 mb-2">4th</div>
                <div className="text-lg text-gray-500 uppercase tracking-widest">
                  PLACE
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-500 ease-out ${
                  currentStep >= 2
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                {currentStep >= 2 && sortedTeams[3] && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">
                      {sortedTeams[3].name}
                    </div>
                    <div
                      className={`bg-gradient-to-t ${
                        getPositionStyling(4).bg
                      } ${
                        getPositionStyling(4).glow
                      } rounded-t-xl relative overflow-hidden border-t-4 ${
                        getPositionStyling(4).border
                      } w-full`}
                      style={{ height: `${getPodiumHeight(4)}px` }}
                    >
                      <div
                        className={`absolute inset-0 ${
                          getPositionStyling(4).bgOverlay
                        }`}
                      ></div>
                      <div
                        className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-4xl font-bold ${
                          getPositionStyling(4).text
                        }`}
                      >
                        {getPositionStyling(4).crown}
                      </div>
                      <div
                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
                          getPositionStyling(4).text
                        } font-bold text-2xl`}
                      >
                        {sortedTeams[3].score.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                currentStep >= step
                  ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                  : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Error indicator */}
      {error && (
        <div className="absolute top-8 right-8 z-50">
          <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-6 py-3 rounded-xl text-base backdrop-blur-sm">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
            Offline Mode
          </div>
        </div>
      )}

      {/* Optimized CSS */}
      <style jsx>{`
        .animation-delay-75 {
          animation-delay: 75ms;
        }

        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizWinnersPodium;
