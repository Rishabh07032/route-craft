import {
  Brain,
  MapPinned,
  CloudSun,
  ShieldCheck,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Brain size={38} />,
      title: "AI Smart Planning",
      desc: "Generate personalized itineraries based on your budget, travel style and duration.",
    },
    {
      icon: <MapPinned size={38} />,
      title: "Hidden Gems",
      desc: "Discover beautiful destinations beyond the typical tourist attractions.",
    },
    {
      icon: <CloudSun size={38} />,
      title: "Live Weather",
      desc: "Get weather insights before your journey for a hassle-free experience.",
    },
    {
      icon: <ShieldCheck size={38} />,
      title: "Safe Travel",
      desc: "Curated recommendations to make every trip comfortable and secure.",
    },
  ];

  return (
    <section className="bg-[#07111f] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-5xl font-bold text-white">
          Why RouteCraft?
        </h2>

        <p className="text-center text-gray-400 mt-5 max-w-2xl mx-auto">
          Everything you need to plan smarter journeys across India with AI.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((item, index) => (

            <div
              key={index}
              className="
group
rounded-3xl
bg-white/5
backdrop-blur-2xl
border border-white/10
shadow-xl
p-8
transition-all
duration-500
hover:-translate-y-3
hover:border-cyan-400
hover:bg-white/10
"
            >

              <div className="text-cyan-400 mb-6">
                {item.icon}
              </div>

              <h3 className="text-white text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;