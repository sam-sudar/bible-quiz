"use client";
import Link from "next/link";
import { Smile, Users, AlarmClock, BarChart3 } from "lucide-react";

export default function QuizPage() {
  return (
    <main className="min-h-screen relative bg-transparent text-white px-6 py-12 flex flex-col items-center">
      {/* Floating Custom Timer Icon */}
      <Link
        href="/quiz/scorecard"
        className="fixed left-6 bottom-6 z-50 group perspective-3d"
        title="View Scoreboard"
      >
        <div
          className="
            transform transition-transform duration-500 group-hover:-rotate-x-6 group-hover:-rotate-y-6 group-hover:scale-105 
            bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500
            p-4 rounded-full shadow-2xl border border-white/10 hover:shadow-yellow-300/50
            hover:animate-pulse
          "
        >
          <BarChart3 className="text-[#1b1b3a] w-8 h-8 drop-shadow-lg" />
        </div>
      </Link>
      <Link
        href="/quiz/timer"
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-emerald-500/20 rounded-full shadow-md transition"
        title="Custom Timer"
      >
        <AlarmClock className="text-emerald-300 w-6 h-6" />
      </Link>

      {/* Header */}
      <header className="text-center mb-40">
        {/* <h1 className="text-6xl font-title text-yellow-300 tracking-wider drop-shadow-xl">
          Group Bible Quiz
        </h1> */}
        <h1 className="text-4xl md:text-6xl font-title font-thin tracking-wider mb-4">
          GROUP{" "}
          <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            QUIZ
          </span>
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        <p className="text-lg font-body text-blue-300 mt-4 italic max-w-xl mx-auto">
          “Let the Word of Christ dwell in you richly.” – Colossians 3:16
        </p>
      </header>

      {/* Quiz Options */}
      <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </section>
    </main>
  );
}

const games = [
  {
    title: "Emoji Guess",
    description: "Guess Gospel events using emoji clues",
    link: "/quiz/emoji",
    icon: <Smile className="text-purple-200 w-10 h-10 drop-shadow-sm" />,
    bg: "from-[#4361ee]/30  to-[#5A4FCF]/60",
    ring: "ring-pink-300/50",
    text: "text-slate-300",
    iconBg: "bg-black/30",
  },
  {
    title: "Group Quiz",
    description: "Team-based Gospel multiple-choice challenge",
    link: "/quiz/group-quiz",
    icon: <Users className="text-purple-200 w-10 h-10 drop-shadow-lg" />,
    bg: "from-[#7209b7]/70 to-[#3a0ca3]/60",
    ring: "ring-purple-300/50",
    text: "text-white",
    iconBg: "bg-white/10",
  },
  {
    title: "Verse Puzzle",
    description: "Rebuild scrambled verses from Matthew to John",
    link: "/quiz/verse-puzzle",
    icon: (
      <svg
        className="w-10 h-10 text-green-200 drop-shadow-lg"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    bg: "from-[#0892d0]/70 to-[#8f94fb]/60",
    ring: "ring-indigo-300/40",
    text: "text-white",
    iconBg: "bg-white/10",
  },
];

function GameCard({ title, description, link, icon, bg, ring, text, iconBg }) {
  return (
    <Link href={link}>
      <div
        className={`
    cursor-pointer group relative bg-gradient-to-br ${bg} 
    border border-white/10 backdrop-blur-md rounded-2xl p-5 shadow-md
    min-h-[200px] w-full
    flex flex-col items-center justify-between text-center 
    transition-all duration-500 ease-in-out 
    hover:scale-[1.04] hover:-rotate-1 hover:shadow-2xl hover:${ring} hover:ring-2
  `}
      >
        {/* Glow Animation Border on Hover */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm z-0" />

        {/* Icon with Animation */}
        <div
          className={`${iconBg} p-4 mb-4 rounded-full shadow-inner z-10 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6`}
        >
          {icon}
        </div>

        {/* Title */}
        <h2
          className={`text-2xl sm:text-3xl font-bold font-title ${text} z-10`}
        >
          {title}
        </h2>

        <p className={`text-sm font-body mt-2 ${text}/80 z-10`}>
          {description}
        </p>

        {/* Pulse Ring Animation on Hover */}
        <div className="absolute inset-0 rounded-2xl group-hover:animate-pulse-slow bg-white/5 pointer-events-none z-0" />
      </div>
    </Link>
  );
}
