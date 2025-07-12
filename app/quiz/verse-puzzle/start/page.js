"use client";
import { useState } from "react";

// Sample verse data - you can replace this with your JSON import
const verseQuestions = [
  {
    reference: "Matthew 5:16",
    jumbled: [
      "so that they may see your good deeds",
      "In the same way, let your light shine before others,",
      "and glorify your Father in heaven.",
    ],
    correct: [
      "In the same way, let your light shine before others,",
      "so that they may see your good deeds",
      "and glorify your Father in heaven.",
    ],
  },
  {
    reference: "John 3:16",
    jumbled: [
      "that whoever believes in him shall not perish",
      "For God so loved the world",
      "but have eternal life.",
    ],
    correct: [
      "For God so loved the world",
      "that whoever believes in him shall not perish",
      "but have eternal life.",
    ],
  },
  {
    reference: "Matthew 11:28",
    jumbled: [
      "and I will give you rest.",
      "Come to me, all you who are weary",
      "and burdened,",
    ],
    correct: [
      "Come to me, all you who are weary",
      "and burdened,",
      "and I will give you rest.",
    ],
  },
  {
    reference: "John 14:6",
    jumbled: [
      "No one comes to the Father",
      "I am the way and the truth and the life.",
      "except through me.",
    ],
    correct: [
      "I am the way and the truth and the life.",
      "No one comes to the Father",
      "except through me.",
    ],
  },
  {
    reference: "Matthew 28:19",
    jumbled: [
      "baptizing them in the name of the Father",
      "Therefore go and make disciples of all nations,",
      "and of the Son and of the Holy Spirit.",
    ],
    correct: [
      "Therefore go and make disciples of all nations,",
      "baptizing them in the name of the Father",
      "and of the Son and of the Holy Spirit.",
    ],
  },
];

export default function VersePuzzlePage() {
  const [reveal, setReveal] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleReveal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setReveal(!reveal);
      setIsAnimating(false);
    }, 150);
  };

  const handleToggleReferences = () => {
    setShowReferences(!showReferences);
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden ">
      {/* Hover-activated Navbar */}
      <div
        className="absolute top-0 left-0 w-full h-20 z-30 "
        onMouseEnter={() => setShowNavbar(true)}
        onMouseLeave={() => setShowNavbar(false)}
      >
        <div
          className={`w-full bg-gradient-to-br from-[#0f0c29]/95 via-[#302b63]/95 to-[#24243e]/95 backdrop-blur-lg border-b border-yellow-200/20 shadow-2xl transition-all duration-500 ${
            showNavbar
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex justify-center items-center py-4 gap-6">
            <button
              onClick={handleReveal}
              className={`px-10 py-3 font-black text-lg rounded-full transition-all duration-300 shadow-2xl hover:scale-105
                ${
                  reveal
                    ? "bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 hover:shadow-[0_0_25px_rgba(255,0,100,0.4)]"
                    : "bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                }
                ${isAnimating ? "animate-pulse" : ""}
              `}
            >
              {reveal ? "🙈 HIDE ANSWERS" : "✨ REVEAL ANSWERS"}
            </button>

            <button
              onClick={handleToggleReferences}
              className={`px-10 py-3 font-black text-lg rounded-full transition-all duration-300 shadow-2xl hover:scale-105
                ${
                  showReferences
                    ? "bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 hover:shadow-[0_0_25px_rgba(100,0,255,0.4)]"
                    : "bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 hover:shadow-[0_0_25px_rgba(100,100,255,0.4)]"
                }`}
            >
              {showReferences ? "📖 HIDE REFS" : "📚 SHOW REFS"}
            </button>
          </div>
        </div>
      </div>
      {/* References Sidebar */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f0c29]/95 via-[#302b63]/95 to-[#24243e]/95 backdrop-blur-lg z-20 transition-all duration-500 ${
          showReferences ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex items-center justify-center px-8">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black font-title text-yellow-300 drop-shadow-xl mb-4">
                📚 Verse References
              </h2>
              <p className="text-[#f4e9cd] italic">
                Match each reference to its correct verse
              </p>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {verseQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-yellow-200/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  {/* Glow Aura */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 opacity-20 blur-2xl rounded-2xl z-0" />

                  <div className="relative z-10 text-center">
                    <div className="text-sm font-bold text-yellow-300 mb-3">
                      VERSE {idx + 1}
                    </div>
                    <h3 className="text-2xl font-black font-title text-yellow-300 drop-shadow-xl">
                      {item.reference}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Grid - Full Screen Maximum Visibility */}
      <div className="h-[95%] w-full p-6 my-4">
        <div className="h-full flex flex-col justify-center space-y-3">
          {verseQuestions.map((item, idx) => (
            <div
              key={idx}
              className={`flex-1 transition-all duration-500 ${
                isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Verse Parts Grid - Full Width, Maximum Size */}
              <div className="h-full">
                <div className="grid grid-cols-3 gap-4 h-full">
                  {(reveal ? item.correct : item.jumbled).map(
                    (part, partIdx) => (
                      <div
                        key={partIdx}
                        className={`flex items-center justify-center p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden
                        ${
                          reveal
                            ? "bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-green-300/40 backdrop-blur-xl"
                            : "bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-yellow-200/40 backdrop-blur-xl"
                        }`}
                      >
                        {/* Glow Aura */}
                        <div
                          className={`absolute -inset-1 opacity-20 blur-2xl rounded-2xl z-0 transition-all duration-500
                        ${
                          reveal
                            ? "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"
                            : "bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500"
                        }`}
                        />

                        <div className="relative z-10 text-center">
                          <div
                            className={`text-2xl lg:text-3xl font-poppins font-semibold leading-tight transition-all duration-300 ${
                              reveal ? "text-green-100" : "text-[#f4e9cd]"
                            }`}
                          >
                            {part}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating instruction at bottom
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-yellow-200/40 backdrop-blur-xl rounded-full px-8 py-3 shadow-xl">
          <p className="text-[#f4e9cd] italic text-sm">
            "Write the verses in correct order on your sheet"
          </p>
        </div>
      </div> */}
    </main>
  );
}
