const ChurchBackground = ({ children }) => {
  const crossPositions = [
    { x: 8, y: 12, size: 16, rotation: 0, opacity: 0.1 },
    { x: 15, y: 25, size: 20, rotation: 15, opacity: 0.08 },
    // ... all the cross positions from the current code
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-amber-500/12"></div>
        <div className="absolute inset-0">
          {crossPositions.map((cross, i) => (
            <div key={i} className="absolute text-white select-none" style={{}}>
              ✝
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ChurchBackground;
