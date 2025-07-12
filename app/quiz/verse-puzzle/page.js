"use client";
import Link from "next/link";

export default function VersePuzzleIntro() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl text-center  animate-fade-up">
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black font-title text-yellow-300 drop-shadow-xl mb-5">
          Verse Puzzle
        </h1>

        {/* New Verse */}
        <p className="text-md text-[#f4e9cd] italic mb-10">
          “I have hidden your word in my heart that I might not sin against
          you.” – Psalm 119:11
        </p>

        {/* Rules Box */}
        <div
          className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-yellow-200/40
          backdrop-blur-xl rounded-2xl px-8 py-10 shadow-2xl relative overflow-hidden mb-7"
        >
          {/* Glow Aura */}
          <div className="absolute -inset-1 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 opacity-20 blur-2xl rounded-2xl z-0" />

          {/* Content */}
          <div className="relative z-10 text-left w-full space-y-5">
            <h2 className="text-4xl font-poppins font-semibold text-yellow-100 mb-4 text-center">
              🧠 How to Play
            </h2>
            <ul className="list-disc list-inside font-poppins text-lg text-gray-100 space-y-3 max-w-3xl mx-auto text-left">
              <li>
                You’ll be shown{" "}
                <span className="text-yellow-300 font-semibold">
                  5 memory verses
                </span>{" "}
                from Matthew to John.
              </li>
              <li>
                Each verse is split into{" "}
                <span className="text-pink-300 font-semibold">3 parts</span> and
                jumbled randomly.
              </li>
              <li>
                Teams must write the correct verse (in order) on the sheet
                provided.
              </li>
              <li>
                First 3 teams to complete correctly will earn:
                <ul className="list-disc ml-6 mt-2 text-green-300 space-y-1">
                  <li>🏆 1st: 50 points</li>
                  <li>🥈 2nd: 40 points</li>
                  <li>🥉 3rd: 30 points</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <Link
          href="/quiz/verse-puzzle/start"
          className="inline-block px-12 py-4 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 text-[#1b1b3a] font-bold rounded-full 
          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 text-lg shadow-xl"
        >
          ✨ Start Puzzle Round
        </Link>
      </div>
    </main>
  );
}
