import { useNavigate } from "react-router-dom";

function CTA() {

  const navigate = useNavigate();

  return (

    <section className="relative py-28 bg-[#050816] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

      <div className="relative max-w-5xl mx-auto px-6">

        <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-16 text-center">

          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">

            Ready to Explore
            <br />

            Incredible India?

          </h2>

          <p className="mt-8 text-slate-300 text-lg leading-8 max-w-2xl mx-auto">

            Let RouteCraft create a personalized itinerary
            based on your destination, budget and travel style.

          </p>

          <button

            onClick={() => navigate("/planner")}

            className="
            mt-12
            px-10
            py-4
            rounded-2xl
            bg-cyan-500
            hover:bg-cyan-400
            text-white
            text-lg
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            shadow-xl
            "

          >

            Start Planning →

          </button>

        </div>

      </div>

    </section>

  );
}

export default CTA;