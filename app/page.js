"use client";
import { useEffect, useState } from "react";

const ChurchQuizWelcome = () => {
  const [show, setShow] = useState({
    title: false,
    subtitle: false,
    verse: false,
    description: false,
    gospels: false,
    button: false,
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setShow((p) => ({ ...p, title: true })), 300),
      setTimeout(() => setShow((p) => ({ ...p, subtitle: true })), 800),
      setTimeout(() => setShow((p) => ({ ...p, verse: true })), 1300),
      setTimeout(() => setShow((p) => ({ ...p, description: true })), 1800),
      setTimeout(() => setShow((p) => ({ ...p, gospels: true })), 2300),
      setTimeout(() => setShow((p) => ({ ...p, button: true })), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const gospelBooks = [
    {
      name: "Matthew",
      chapter: "28 Chapters",
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "Mark",
      chapter: "16 Chapters",
      color: "from-emerald-600 to-emerald-400",
    },
    {
      name: "Luke",
      chapter: "24 Chapters",
      color: "from-purple-600 to-purple-400",
    },
    {
      name: "John",
      chapter: "21 Chapters",
      color: "from-amber-600 to-amber-400",
    },
  ];

  return (
    <div className="h-screen text-white overflow-hidden relative flex items-center justify-center px-6">
      <div className="absolute top-5 left-5 z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border border-white/20 shadow-lg">
          ✝
        </div>
      </div>

      <div className="relative z-10 px-8 w-full h-full  flex items-center justify-between">
        {/* Left Side */}
        <div className="w-[70%] flex flex-col justify-center space-y-5 pr-8">
          {/* Title */}
          <h1
            className={`text-7xl font-title font-bold tracking-wider transition-all duration-700 ${
              show.title
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="text-gray-300">HEBRON</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              AG CHURCH
            </span>
          </h1>

          {/* Subtitle */}
          <h2
            className={`text-2xl font-bold text-blue-300  tracking-wide transition-all duration-700 ${
              show.subtitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Sunday School Group Quiz
          </h2>

          {/* Memory Verse */}
          <div
            className={`transition-all mt-10 duration-700 ${
              show.verse
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/50 backdrop-blur-sm border border-white/10 w-[75%] rounded-xl p-4 shadow">
              <p className="italic text-base text-gray-200">
                "Let the little children come to me, for the kingdom of heaven
                belongs to such as these."
              </p>
              <span className="text-blue-300 text-sm font-medium block mt-2">
                Matthew 19:14
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-sm text-gray-400 transition-all duration-700 max-w-md ${
              show.description
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Explore the Gospels in a fun group quiz challenge! Learn about
            Jesus’ miracles, parables, and teachings while earning points with
            your team.
          </p>

          {/* Button */}
          <div
            className={`transition-all duration-700 ${
              show.button
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={() => (window.location.href = "/quiz")}
              className="mt-7 bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer px-6 py-3 rounded-full text-base font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Let's Begin →
            </button>
          </div>
        </div>

        {/* Right Side - Gospels */}
        <div className="w-[30%]  flex flex-col items-center justify-center space-y-6">
          <h3
            className={`text-2xl font-semibold text-blue-300 tracking-wider transition-all duration-700 ${
              show.gospels
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            The Four Gospels
          </h3>

          <div
            className={`grid grid-cols-2 gap-6 transition-all duration-700 ${
              show.gospels
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {gospelBooks.map((book) => (
              <div
                key={book.name}
                className={`bg-gradient-to-t ${book.color} rounded-2xl p-8 cursor-pointer shadow-md border border-white/10`}
              >
                <h4 className="text-white text-2xl  font-semibold">
                  {book.name}
                </h4>
                <p className="text-white/70 text-sm">{book.chapter}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurchQuizWelcome;
