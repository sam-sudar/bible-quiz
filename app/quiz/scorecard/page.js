"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";

const VerticalStandings = () => {
  const [revealedTeams, setRevealedTeams] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Optimized team data with enhanced colors
  const fallbackTeamData = useMemo(
    () => [
      {
        name: "Group 1",
        score: 850,
        color: "from-blue-600 to-blue-400",
        shadowColor: "shadow-blue-500/40",
        glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
      },
      {
        name: "Group 2",
        score: 430,
        color: "from-red-600 to-red-400",
        shadowColor: "shadow-red-500/40",
        glowColor: "shadow-[0_0_30px_rgba(239,68,68,0.5)]",
      },
      {
        name: "Group 3",
        score: 720,
        color: "from-emerald-600 to-emerald-400",
        shadowColor: "shadow-emerald-500/40",
        glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.5)]",
      },
      {
        name: "Group 4",
        score: 590,
        color: "from-purple-600 to-purple-400",
        shadowColor: "shadow-purple-500/40",
        glowColor: "shadow-[0_0_30px_rgba(147,51,234,0.5)]",
      },
      {
        name: "Group 5",
        score: 680,
        color: "from-amber-600 to-amber-400",
        shadowColor: "shadow-amber-500/40",
        glowColor: "shadow-[0_0_30px_rgba(245,158,11,0.5)]",
      },
    ],
    []
  );

  // Optimized data fetching with error handling
  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.0.104:4000/scores");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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

  // Memoized calculations for performance
  const sortedTeams = useMemo(() => {
    return teamData
      .map((team, index) => ({ ...team, originalIndex: index }))
      .sort((a, b) => b.score - a.score);
  }, [teamData]);

  const maxScore = useMemo(() => {
    return Math.max(...teamData.map((t) => t.score), 1);
  }, [teamData]);

  // Optimized animation sequence
  useEffect(() => {
    if (!loading && teamData.length > 0) {
      // Reset states
      setRevealedTeams([]);
      setBarsAnimated(false);
      setShowTitle(false);

      // Dramatic staggered reveal sequence
      const titleTimer = setTimeout(() => setShowTitle(true), 500);

      const revealTimer = setTimeout(() => {
        const revealInterval = setInterval(() => {
          setRevealedTeams((prev) => {
            const nextIndex = prev.length;
            if (nextIndex < sortedTeams.length) {
              return [...prev, sortedTeams[sortedTeams.length - 1 - nextIndex]];
            } else {
              clearInterval(revealInterval);
              // Longer pause before bar animation for maximum drama
              setTimeout(() => setBarsAnimated(true), 800);
              return prev;
            }
          });
        }, 1200); // Increased from 400ms to 1200ms for slower, more dramatic reveals
      }, 1500); // Increased initial delay

      return () => {
        clearTimeout(titleTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [loading, teamData.length, sortedTeams]);

  // Optimized bar width calculation
  const getBarWidth = useCallback(
    (score) => {
      return (score / maxScore) * 100;
    },
    [maxScore]
  );

  // Optimized position text
  const getPositionText = useCallback(
    (index) => {
      const position = sortedTeams.length - index;
      const suffixes = ["ST", "ND", "RD", "TH"];
      const suffix = position <= 3 ? suffixes[position - 1] : "TH";
      return `${position}${suffix}`;
    },
    [sortedTeams.length]
  );

  // Loading state with dramatic spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-500 animate-spin animation-delay-75"></div>
          </div>
          <p className="text-xl font-light tracking-wide">
            Loading Performance Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      {/* Dramatic Background Effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20"></div>
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(59,130,246,0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 70% 30%, rgba(147,51,234,0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Particle Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Enhanced Back Button */}
        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              <svg
                className="w-5 h-5 mr-2"
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
              Back
            </span>
          </button>
        </div>

        {/* Error indicator */}
        {error && (
          <div className="absolute top-6 right-6 z-50">
            <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Offline Mode
            </div>
          </div>
        )}

        {/* Dramatic Header */}
        <div
          className={`text-center py-12 transition-all duration-1000 ease-out ${
            showTitle
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl  mb-6 font-title relative">
            <span className="text-gray-300">PERFORMANCE</span>
            <div className="inline-block ml-6">
              <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                RANKINGS
              </span>
            </div>
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
        </div>

        {/* Enhanced Standings Container */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-5 gap-8 h-[400px]">
              {[...Array(Math.max(5, teamData.length))].map((_, index) => {
                const teamIndex = Math.max(5, teamData.length) - 1 - index;
                const team = revealedTeams[teamIndex];
                const isRevealed = team !== undefined;
                const barHeight = isRevealed ? getBarWidth(team.score) : 0;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col justify-end group"
                  >
                    {/* Position Label with dramatic entrance */}
                    <div
                      className={`text-center mb-6 transition-all duration-1000 ease-out ${
                        isRevealed
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-8 scale-95"
                      }`}
                      style={{
                        transitionDelay: isRevealed
                          ? `${teamIndex * 100}ms`
                          : "0ms",
                      }}
                    >
                      <div className="relative">
                        <div className="text-3xl font-bold text-white mb-2 relative">
                          {isRevealed && (
                            <>
                              <span className="relative z-10">
                                {getPositionText(teamIndex)}
                              </span>
                              <div className="absolute inset-0 text-blue-400 blur-sm animate-pulse"></div>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-[0.2em] font-light">
                          {isRevealed ? "POSITION" : ""}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Bar Container */}
                    <div className="relative flex-1 flex flex-col justify-end">
                      {isRevealed && (
                        <>
                          {/* Base platform */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full shadow-lg"></div>

                          {/* Main Bar with dramatic effects */}
                          <div
                            className={`bg-gradient-to-t ${team.color} ${team.glowColor} rounded-t-lg relative overflow-hidden transition-all duration-1000 ease-out transform group-hover:scale-[1.02] shadow-2xl border-t-2 border-white/20`}
                            style={{
                              height: barsAnimated ? `${barHeight}%` : "0%",
                              minHeight: "80px",
                              transitionDelay: `${teamIndex * 200}ms`, // Increased stagger delay
                              transitionDuration: "1500ms", // Longer bar animation
                            }}
                          >
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"></div>

                            {/* Vertical flow effect */}
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-60"
                              style={{
                                animation: `flowUp 4s infinite ease-in-out`,
                                animationDelay: `${teamIndex * 300}ms`,
                              }}
                            />

                            {/* Score with enhanced typography */}
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl tracking-wide">
                              <div className="relative">
                                <span className="relative z-10">
                                  {team.score.toLocaleString()}
                                </span>
                                <div className="absolute inset-0 text-white blur-sm opacity-50"></div>
                              </div>
                            </div>

                            {/* Pulsing edge effect */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Enhanced Team Name with dramatic entrance */}
                    <div
                      className={`text-center mt-6 transition-all duration-1000 ease-out ${
                        isRevealed
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-8 scale-95"
                      }`}
                      style={{
                        transitionDelay: isRevealed
                          ? `${teamIndex * 150}ms`
                          : "0ms",
                      }}
                    >
                      <div className="text-lg font-semibold text-white mb-2 tracking-wide">
                        {isRevealed ? team.name : ""}
                      </div>
                      <div className="text-sm text-gray-400 font-light">
                        {isRevealed
                          ? `${team.score.toLocaleString()} points`
                          : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Optimized CSS animations */}
      <style jsx>{`
        @keyframes flowUp {
          0%,
          100% {
            transform: translateY(100%) scaleY(0.5);
            opacity: 0;
          }
          50% {
            transform: translateY(-100%) scaleY(1);
            opacity: 1;
          }
        }

        .animation-delay-75 {
          animation-delay: 75ms;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VerticalStandings;
