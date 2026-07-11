const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <>
      <div className="hidden lg:flex items-center justify-center p-12 bg-white">
        <div className="max-w-md text-center">
          {/* Grid Pattern */}
          <div className="grid grid-cols-3 gap-3 mb-8 justify-center justify-items-center">
            {[...Array(9)].map((_, i) => {
              return (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-2xl bg-gray-700/30 ${
                    i % 2 === 0 ? "animate-pulse" : "animate-bounce"
                  }`}
                ></div>
              );
            })}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
    </>
  );
};

export default AuthImagePattern;
