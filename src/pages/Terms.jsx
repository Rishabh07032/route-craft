import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Terms() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-[#050816] text-white px-6 py-20">
      <button
  onClick={() => navigate(-1)}
  className="
  flex
  items-center
  gap-2
  mb-8
  px-5
  py-3
  rounded-2xl
  bg-white/10
  backdrop-blur-xl
  border
  border-white/10
  hover:border-cyan-400
  hover:bg-cyan-500/10
  transition-all
"
>
  <ArrowLeft size={20} />
  Back
</button>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Terms & Conditions
        </h1>

        <p className="text-slate-300 leading-8">
          By using RouteCraft, you agree to use the platform responsibly.
          The itineraries generated are AI-based recommendations and should
          be verified before making travel decisions.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">
          User Responsibilities
        </h2>

        <ul className="list-disc ml-6 text-slate-300 leading-8">
          <li>Provide accurate travel information.</li>
          <li>Respect local laws and regulations.</li>
          <li>Use the platform only for lawful purposes.</li>
        </ul>

      </div>

    </section>
  );
}

export default Terms;