import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-5xl
sm:text-6xl
md:text-7xl
lg:text-8xl
xl:text-9xl font-black leading-[0.9] tracking-[-0.04em] drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
  <span className="text-white">Explore</span>

  <br />

  <span className="text-white ml-[1.2px] ">Incredible </span>

  <span className="bg-gradient-to-br from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
    India
  </span>
</h1>

        <p className="mt-8 text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
  Experience AI-powered travel planning with personalized itineraries,
  live weather, hidden gems, luxury stays and unforgettable adventures
  across India.
</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
  onClick={() => navigate("/planner")}
  className="
  px-8 py-4
  rounded-2xl
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  text-white
  font-semibold
  shadow-lg
  hover:bg-white/20
  hover:scale-105
  transition-all
  duration-300
  "
>
  ✨ Plan My Trip
</button>

          <button
  onClick={() => navigate("/destinations")}
  className="
  px-8 py-4
  rounded-2xl
  bg-transparent
  border border-white/20
  backdrop-blur-xl
  text-white
  font-semibold
  hover:bg-white/10
  hover:scale-105
  transition-all
  duration-300
  "
>
  🌍 Explore Destinations
</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;