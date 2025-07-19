"use client";
import { useState, useMemo } from "react";

// Memory verse data with your requested verses
const verseQuestions = [
  {
    reference: "Matthew 6:33",
    jumbled: [
      "But seek first his kingdom",
      "and his righteousness,",
      "and all these things will be given to you as well.",
    ],
    correct: [
      "But seek first his kingdom",
      "and his righteousness,",
      "and all these things will be given to you as well.",
    ],
  },
  {
    reference: "Mark 16:15",
    jumbled: [
      "Go into all the world",
      "and preach the gospel",
      "to all creation.",
    ],
    correct: [
      "Go into all the world",
      "and preach the gospel",
      "to all creation.",
    ],
  },
  {
    reference: "Luke 9:23",
    jumbled: [
      "Whoever wants to be my disciple",
      "must deny themselves and take up their cross daily",
      "and follow me.",
    ],
    correct: [
      "Whoever wants to be my disciple",
      "must deny themselves and take up their cross daily",
      "and follow me.",
    ],
  },
  {
    reference: "John 3:16",
    jumbled: [
      "For God so loved the world",
      "that he gave his one and only Son,",
      "that whoever believes in him shall not perish but have eternal life.",
    ],
    correct: [
      "For God so loved the world",
      "that he gave his one and only Son,",
      "that whoever believes in him shall not perish but have eternal life.",
    ],
  },
  {
    reference: "John 14:6",
    jumbled: [
      "I am the way and the truth and the life.",
      "No one comes to the Father",
      "except through me.",
    ],
    correct: [
      "I am the way and the truth and the life.",
      "No one comes to the Father",
      "except through me.",
    ],
  },
];

export default function VersePuzzlePage() {
  const [reveal, setReveal] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Hardcoded shuffle pattern to avoid hydration errors
  const shuffledOrder = [12, 3, 8, 1, 14, 6, 9, 2, 11, 4, 0, 7, 13, 5, 10];

  // Create grid data - show verses in rows when revealed, shuffled when hidden
  const gridData = useMemo(() => {
    if (reveal) {
      // Show verses in organized rows (3 parts per row)
      const organized = [];
      verseQuestions.forEach((verse) => {
        verse.correct.forEach((part) => {
          organized.push({
            text: part,
            isRevealed: true,
          });
        });
      });
      return organized;
    } else {
      // Use hardcoded shuffle pattern
      const allParts = [];
      verseQuestions.forEach((verse) => {
        verse.jumbled.forEach((part) => {
          allParts.push({
            text: part,
            isRevealed: false,
          });
        });
      });

      // Apply hardcoded shuffle
      const shuffled = shuffledOrder.map((index) => allParts[index]);
      return shuffled;
    }
  }, [reveal]);

  const handleReveal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setReveal(!reveal);
      setIsAnimating(false);
    }, 300);
  };

  const handleToggleReferences = () => {
    setShowReferences(!showReferences);
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Hover-activated Navbar */}
      <div
        className="absolute top-0 left-0 w-full h-20 z-30"
        onMouseEnter={() => setShowNavbar(true)}
        onMouseLeave={() => setShowNavbar(false)}
      >
        <div
          className={`w-full bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-800/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-500 ${
            showNavbar
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex justify-center items-center py-4 gap-8">
            <button
              onClick={handleReveal}
              className={`px-12 py-4 font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:scale-105 backdrop-blur-md relative overflow-hidden group
                ${
                  reveal
                    ? "bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 hover:shadow-[0_0_40px_rgba(255,0,100,0.5)]"
                    : "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:shadow-[0_0_40px_rgba(0,255,150,0.5)]"
                }
                ${isAnimating ? "animate-bounce" : ""}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10">
                {reveal ? "🔒 HIDE ANSWERS" : "✨ REVEAL ANSWERS"}
              </span>
            </button>

            <button
              onClick={handleToggleReferences}
              className={`px-12 py-4 font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:scale-105 backdrop-blur-md relative overflow-hidden group
                ${
                  showReferences
                    ? "bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-700 hover:shadow-[0_0_40px_rgba(255,150,0,0.5)]"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 hover:shadow-[0_0_40px_rgba(150,0,255,0.5)]"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10">
                {showReferences ? "📖 HIDE REFS" : "📚 SHOW REFS"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* References Sidebar */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/98 via-purple-900/98 to-slate-800/98 backdrop-blur-xl z-20 transition-all duration-500 ${
          showReferences ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex items-center justify-center px-8">
          <div className="w-full max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl mb-6">
                📚 Memory Verse References
              </h2>
              <p className="text-xl text-gray-300 font-medium">
                Match each reference to its correct verse parts scattered in the
                grid
              </p>
            </div>

            <div className="grid grid-cols-5 gap-8">
              {verseQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-2 border-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden hover:scale-110 transition-all duration-500 group"
                >
                  {/* Animated glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-30 blur-xl rounded-3xl transition-all duration-500" />

                  {/* Sparkle effect */}
                  <div
                    className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-60 animate-ping"
                    style={{ animationDelay: `${idx * 0.5}s` }}
                  />

                  <div className="relative z-10 text-center">
                    <div className="text-sm font-bold text-gray-300 mb-4 tracking-wider">
                      VERSE {idx + 1}
                    </div>
                    <h3 className="text-3xl font-black text-white drop-shadow-xl">
                      {item.reference}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid - 5 Rows x 3 Columns - MAXIMUM FULLSCREEN */}
      <div className="h-[100%] w-full p-4 mt-1 relative z-10">
        <div className="h-full">
          <div className="grid grid-cols-3 grid-rows-5 gap-3 h-full">
            {gridData.map((item, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 transform ${
                  isAnimating
                    ? "scale-90 opacity-60"
                    : "scale-100 opacity-100 hover:scale-105"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  className="h-full flex items-center justify-center p-6 rounded-3xl shadow-2xl relative overflow-hidden group cursor-pointer
                  bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-2 border-white/20 backdrop-blur-xl
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-white/30 transition-all duration-500"
                >
                  {/* Uniform glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-20 blur-2xl rounded-3xl transition-all duration-500" />

                  {/* Subtle particle effects */}
                  <div className="absolute top-3 left-3 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
                  <div
                    className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />

                  <div className="relative z-10 text-center px-3">
                    <div className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight text-white drop-shadow-lg">
                      {item.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
