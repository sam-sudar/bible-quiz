"use client";
import Link from "next/link";
import { Smile, Users, AlarmClock } from "lucide-react";

export default function QuizPage() {
  return (
    <main className="min-h-screen relative bg-transparent text-white px-6 py-12 flex flex-col items-center">
      {/* Floating Custom Timer Icon */}
      <Link
        href="/quiz/timer"
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-emerald-500/20 rounded-full shadow-md transition"
        title="Custom Timer"
      >
        <AlarmClock className="text-emerald-300 w-6 h-6" />
      </Link>

      {/* Header */}
      <header className="text-center mb-40">
        <h1 className="text-6xl font-title text-yellow-300 tracking-wider drop-shadow-xl">
          Group Bible Quiz
        </h1>
        <p className="text-lg font-body text-[#f4e9cd] mt-4 italic max-w-xl mx-auto">
          “Let the Word of Christ dwell in you richly.” – Colossians 3:16
        </p>
      </header>

      {/* Quiz Options */}
      <section className="grid gap-20 grid-cols-1 sm:grid-cols-2 max-w-5xl w-full px-4">
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
    bg: "from-[#fbc2eb]/30 via-[#a18cd1]/70 to-[#8fd3f4]/60",
    ring: "ring-pink-300/50",
    text: "text-slate-900",
    iconBg: "bg-black/30",
  },
  {
    title: "Group Quiz",
    description: "Team-based Gospel multiple-choice challenge",
    link: "/quiz/group-quiz",
    icon: <Users className="text-purple-200 w-10 h-10 drop-shadow-lg" />,
    bg: "from-[#3a0ca3]/80 via-[#7209b7]/70 to-[#4361ee]/60",
    ring: "ring-purple-300/50",
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
          border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md min-h-[220px]
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
          className={`text-3xl sm:text-4xl font-bold font-title ${text} z-10`}
        >
          {title}
        </h2>

        {/* Description */}
        <p className={`text-md font-body mt-2 ${text}/80 z-10`}>
          {description}
        </p>

        {/* Pulse Ring Animation on Hover */}
        <div className="absolute inset-0 rounded-2xl group-hover:animate-pulse-slow bg-white/5 pointer-events-none z-0" />
      </div>
    </Link>
  );
}
