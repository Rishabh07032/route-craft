import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function DestinationsPage() {
  const navigate = useNavigate();
  
  const destinations = [
  {
    name: "Sikkim",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    rating: "4.9",
    budget: "₹20k - ₹30k",
    season: "Mar - Jun",
    reason:
  "Perfect for mountain lovers, peaceful landscapes and adventure seekers.",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    rating: "4.8",
    budget: "₹15k - ₹25k",
    season: "Nov - Feb",
    reason:
  "Ideal for beaches, nightlife, water sports and relaxing vacations.",
  },
  {
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    rating: "4.8",
    budget: "₹18k - ₹28k",
    season: "Oct - Jun",
    reason:
  "Best for snow lovers, trekking enthusiasts and scenic mountain escapes.",
  },
  {
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    rating: "4.9",
    budget: "₹22k - ₹35k",
    season: "Sep - Mar",
    reason:
  "Famous for backwaters, lush greenery and peaceful family holidays.",
  },
  {
    name: "Ladakh",
    image:
      "https://images.unsplash.com/photo-1627894483216-2138af692e32",
    rating: "4.9",
    budget: "₹25k - ₹40k",
    season: "May - Sep",
    reason:
  "Recommended for bikers, adventure seekers and breathtaking landscapes.",
  },
  {
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    rating: "4.7",
    budget: "₹12k - ₹20k",
    season: "Oct - Mar",
    reason:
  "Perfect for history lovers, royal palaces and vibrant local culture.",
  },
];

const lastDestination =
  localStorage.getItem("lastDestination") || "Sikkim";
  

const recommendations = {
  Sikkim: ["Darjeeling", "Tawang", "Meghalaya"],
  Goa: ["Gokarna", "Pondicherry", "Andaman"],
  Manali: ["Kasol", "Shimla", "Auli"],
  Kerala: ["Coorg", "Munnar", "Wayanad"],
};

const suggested =
  recommendations[lastDestination] || [];
  const [loading, setLoading] = useState(false);
const [aiRecommendations, setAiRecommendations] = useState([]);
const discoverPlaces = async () => {
  try {
    setLoading(true);

    const response = await axios.post(
      "https://route-craft-10.onrender.com/recommended-destinations",
      {
        destination: lastDestination,
      }
    );

    setAiRecommendations(response.data.data);

  }  catch (error) {
  console.error("RECOMMENDED ERROR:");
  console.error(error);

  if (error.response) {
    console.error(error.response.data);
  }
} finally {
  setLoading(false);
}
};
  
    return (
      
  <div className="min-h-screen bg-[#050816] text-white pt-32 px-8">
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

    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-black text-center">
        🌍 Explore Destinations
      </h1>

      <p className="text-center text-slate-400 mt-4 text-lg">
        Discover handpicked destinations recommended by RouteCraft AI.
      </p>
      <div className="flex justify-center mt-8">

  <button
    onClick={discoverPlaces}
    className="
    px-8
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-cyan-500
    to-blue-600
    text-white
    font-bold
    shadow-xl
    hover:scale-105
    transition-all
    duration-300
    "
  >
    {loading
      ? "⏳ Discovering..."
      : "✨ Discover Similar Places"}
  </button>

</div>
<div className="grid md:grid-cols-3 gap-8 mt-14">

  {destinations.map((place, index) => (

    <div
      key={index}
      className="
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      overflow-hidden
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-2xl
      transition-all
      duration-300
      "
    >
      

      <img
        src={place.image}
        alt={place.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-6">
        
        

        <h2 className="text-3xl font-black">
          {place.name}
        </h2>

        <div className="flex justify-between mt-5 text-slate-300">

          <span>⭐ {place.rating}</span>

          <span>{place.budget}</span>

        </div>
        
        

        <p className="mt-4 text-cyan-400 font-semibold">
          🌤 Best Season: {place.season}
        </p>
        <div className="mt-5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">

  <p className="text-cyan-400 font-bold text-sm">
    🤖 Why RouteCraft Recommends This
  </p>

  <p className="text-slate-300 mt-2 text-sm leading-6">
    {place.reason}
  </p>

</div>


        <button
          className="
          mt-6
          w-full
          py-3
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-400
          font-bold
          transition
          "
        >
          Explore →
        </button>

      </div>
      

    </div>

  ))}
  

</div>
{aiRecommendations.length > 0 && (

<div className="mt-16">

<h2 className="text-4xl font-black text-cyan-400 mb-10">
🤖 AI Recommended For You
</h2>

<div className="grid md:grid-cols-3 gap-8">

{aiRecommendations.map((place,index)=>(

<div
key={index}
className="
bg-white/5
border
border-cyan-500/20
rounded-3xl
p-6
hover:border-cyan-400
transition
"
>
{place.image && (
  <img
    src={place.image}
    alt={place.Name}
    className="w-full h-56 object-cover rounded-2xl mb-5"
  />
)}
<h2 className="text-3xl font-bold">
📍 {place.Name}
</h2>

<p className="mt-4">
💰 {place.Budget}
</p>

<p className="mt-2">
🌤 {place["Best Season"]}
</p>

<div className="mt-5 bg-cyan-500/10 rounded-xl p-4">

<p className="text-cyan-400 font-bold">
✨ Why RouteCraft Recommends
</p>

<p className="mt-2 text-slate-300">
{place.Reason}
</p>

</div>

<button
className="
mt-6
w-full
py-3
rounded-xl
bg-cyan-500
hover:bg-cyan-400
font-bold
"
>
Plan Trip →
</button>

</div>

))}

</div>

</div>

)}
    </div>

  </div>
  );
}

export default DestinationsPage;