"use client";
import Link from "next/link";

export default function EmojiQuizIntro() {
  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl text-center ">
        {/* Title */}
        {/* <h1 className="text-5xl sm:text-7xl font-black font-title text-yellow-300 drop-shadow-xl animate-fade-up mb-4">
          Emoji Quiz
        </h1> */}
        <h1 className="text-4xl md:text-6xl font-title font-thin tracking-wider mb-4">
          EMOJI{" "}
          <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            QUIZ
          </span>
        </h1>

        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>

        {/* Verse */}
        <p className="text-md text-blue-300 italic animate-fade-up delay-100">
          “Let the Word of Christ dwell in you richly.” – Colossians 3:16
        </p>

        {/* Rules Box with animated gradient + shimmer border */}
        <div
          className="bg-gradient-to-br from-purple-200/20 via-pink-200/10 to-blue-200/20 
          border-2 border-yellow-300/50 backdrop-blur-md px-6 py-8 rounded-2xl shadow-2xl
          relative overflow-hidden animate-fade-up delay-200 mt-30 mb-20"
        >
          {/* Glowing Gradient Ring */}
          <div className="absolute -inset-1 bg-gradient-to-br from--pink-400 to-purple-500 opacity-20 blur-2xl rounded-2xl z-0" />

          {/* Content */}
          <div className="relative z-10 text-left w-full space-y-4">
            {/* <h2 className="text-4xl font-poppins font-semibold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              📜 Rules
            </h2> */}
            <ul className="list-disc list-inside font-poppins text-lg text-gray-100  space-y-2">
              <li>
                You will be shown a creative set of emojis that represent a
                Gospel event or character.
              </li>
              <li>
                You will have 30 seconds to guess the answer before the timer
                ends.
              </li>
              <li>Raise your hand if you know the answer!</li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <Link
          href="/quiz/emoji/start"
          className="inline-block mt-2 px-10 py-4 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 text-[#1b1b3a] font-bold rounded-full 
          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 text-lg shadow-lg animate-fade-up delay-300 text-md"
        >
          🚀 Start Quiz
        </Link>
      </div>
    </main>
  );
}
