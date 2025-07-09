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
      <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl w-full px-4">
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
    icon: <Smile className="text-yellow-700 w-10 h-10" />,
    bg: "from-yellow-200/80 to-yellow-100/40",
    ring: "ring-yellow-300",
    text: "text-yellow-900",
  },
  {
    title: "Group Quiz",
    description: "Team-based Gospel multiple-choice challenge",
    link: "/quiz/group-quiz",
    icon: <Users className="text-purple-400 w-10 h-10" />,
    bg: "from-purple-200/80 to-purple-100/40",
    ring: "ring-purple-300",
    text: "text-purple-900",
  },
];

function GameCard({ title, description, link, icon, bg, ring, text }) {
  return (
    <Link href={link}>
      <div
        className={`cursor-pointer bg-gradient-to-br ${bg} border border-white/10 backdrop-blur-md 
        hover:${ring} hover:ring-2 transition-all duration-300 rounded-2xl p-6 shadow-md min-h-[200px] flex flex-col justify-between`}
      >
        <div className="flex items-center gap-4 mb-4">
          {icon}
          <h2 className={`text-3xl font-extrabold ${text}`}>{title}</h2>
        </div>
        <p className={`text-sm font-body ${text}/80`}>{description}</p>
      </div>
    </Link>
  );
}
