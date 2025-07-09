"use client";
import Link from "next/link";

export default function EmojiQuizIntro() {
  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl text-center space-y-8 h-150 px-4">
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black font-title text-yellow-300 drop-shadow-lg">
          Emoji Quiz
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
            <li>
              You will be shown a creative set of Emojis that represent a Gospel
              event or character.
            </li>
            <li>
              You will have 30 seconds to guess the answer before the timer
              buzzes.
            </li>
            <li>Raise your hand if you know the answer.</li>
          </ul>
        </div>

        {/* Start Button */}
        <Link
          href="/quiz/emoji/start"
          className="inline-block mt-4 px-8 py-3 bg-yellow-300 text-[#1b1b3a] font-semibold rounded-full hover:bg-yellow-400 transition text-lg shadow-md"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}
