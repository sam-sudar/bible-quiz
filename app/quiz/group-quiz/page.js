"use client";
import Link from "next/link";

export default function GroupQuizIntro() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1b1b3a] via-[#2a2255] to-[#0f0c29] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl text-center space-y-8 px-4">
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black font-title text-yellow-300 drop-shadow-lg">
          Group Quiz
        </h1>

        {/* Verse */}
        <p className="text-md text-[#f4e9cd] italic">
          “Let the Word of Christ dwell in you richly.” – Colossians 3:16
        </p>

        {/* Rules */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-8 mt-20 rounded-2xl border border-yellow-300 shadow-lg text-left w-full">
          <h2 className="text-2xl font-semibold text-yellow-200 mb-4">
            📜 Rules
          </h2>
          <ul className="list-disc list-inside text-gray-100 text-base space-y-2">
            <li>Each team will be shown a multiple-choice question.</li>
            <li>You have 15 seconds to discuss and answer.</li>
            <li>Select the right option within the time limit.</li>
            <li>
              Green background = Correct | Red background = Wrong or Timeout
            </li>
            <li>Steal chance: If one team fails, others may answer.</li>
          </ul>
        </div>

        {/* Start Button */}
        <Link
          href="/quiz/group-quiz/start"
          className="inline-block mt-4 px-8 py-3 bg-yellow-300 text-[#1b1b3a] font-semibold rounded-full hover:bg-yellow-400 transition text-lg shadow-md"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}
