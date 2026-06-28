import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Privacy() {
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
          Privacy Policy
        </h1>

        <p className="text-slate-300 leading-8">
          At RouteCraft, your privacy matters. We only use the
          information you provide to generate personalized travel
          itineraries and improve your experience.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">
          Information We Collect
        </h2>

        <ul className="list-disc ml-6 text-slate-300 leading-8">
          <li>Destination preferences</li>
          <li>Budget and trip duration</li>
          <li>Basic account information</li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4">
          Data Usage
        </h2>

        <p className="text-slate-300 leading-8">
          Your information is used only to personalize your travel
          experience. We never sell your personal data.
        </p>

      </div>

    </section>
  );
}

export default Privacy;