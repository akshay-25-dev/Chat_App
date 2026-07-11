const AuthImagePattern = ({ title, subtitle }) => {
  // Tile configs: color + opacity for visual depth
  const tiles = [
    { color: "bg-blue-200/40",  opacity: "opacity-60", delay: "delay-0" },
    { color: "bg-blue-400/30",  opacity: "opacity-80", delay: "delay-150" },
    { color: "bg-gray-300/40",  opacity: "opacity-50", delay: "delay-300" },
    { color: "bg-blue-300/30",  opacity: "opacity-70", delay: "delay-450" },
    { color: "bg-blue-500/20",  opacity: "opacity-90", delay: "delay-600" },
    { color: "bg-blue-300/30",  opacity: "opacity-60", delay: "delay-750" },
    { color: "bg-gray-300/40",  opacity: "opacity-50", delay: "delay-900" },
    { color: "bg-blue-400/30",  opacity: "opacity-70", delay: "delay-1050" },
    { color: "bg-blue-200/40",  opacity: "opacity-60", delay: "delay-1200" },
  ];

  return (
    <>
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md text-center">
          {/* Grid Pattern */}
          <div className="grid grid-cols-3 gap-3 mb-8 rotate-6">
            {tiles.map((tile, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl ${tile.color} ${tile.opacity} ${tile.delay} animate-float hover:scale-110 transition-transform duration-300 cursor-pointer`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
    </>
  );
};

export default AuthImagePattern;

