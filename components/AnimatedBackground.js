export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute w-[60vw] h-[80vw] bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-0"></div>
      <div className="absolute w-[40vw] h-[60vw] bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-[10%] left-[50%]"></div>
      <div className="absolute w-[40vw] h-[30vw] bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 top-[10%] right-[10%]"></div>
    </div>
  );
}
