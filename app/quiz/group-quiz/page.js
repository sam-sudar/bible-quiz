"use client";
import Link from "next/link";

export default function GroupQuizIntro() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29] text-white flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="w-full max-w-5xl text-center ">
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black font-title text-yellow-300 drop-shadow-lg mb-4">
          Group Quiz
        </h1>

        {/* Verse */}
        <p className="text-md text-[#f4e9cd] italic">
          “Let the Word of Christ dwell in you richly.” – Colossians 3:16
        </p>

        {/* Rules Card */}
        <div className="relative group bg-white/10 backdrop-blur-xl p-8 mt-20 rounded-2xl border border-yellow-300 shadow-xl text-left w-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-all duration-700" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-blue-300 via-purple-400 to-pink-400 opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-all duration-700" />

          <h2 className="text-4xl font-poppins font-semibold text-yellow-200 mb-4 flex items-center gap-2">
            📜 Rules
          </h2>
          <ul className="list-disc list-inside text-white/90 text-base font-poppins text-lg space-y-2 font-body">
            <li>Each team will be shown a multiple-choice question.</li>
            <li>You have 15 seconds to discuss and answer.</li>
            <li>Select the right option within the time limit.</li>
            <li>
              <span className="text-green-400 font-semibold">
                Green background
              </span>{" "}
              = Correct |{" "}
              <span className="text-red-400 font-semibold">Red background</span>{" "}
              = Wrong or Timeout
            </li>
            <li>Steal chance: If one team fails, others may answer.</li>
          </ul>
        </div>

        {/* Start Button */}
        <Link
          href="/quiz/group-quiz/start"
          className="inline-block mt-12 px-10 py-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 text-[#1b1b3a] font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg text-lg"
        >
          🚀 Start Quiz
        </Link>
      </div>
    </main>
  );
}
