import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [asking, setAsking] = useState(false);
  const totalTrips = trips.length;

const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget), 0);

const averageBudget =
  totalTrips > 0 ? Math.round(totalBudget / totalTrips) : 0;

const totalDays = trips.reduce((sum, trip) => sum + Number(trip.days), 0);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(
  "https://route-craft-10.onrender.com/my-trips",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      setTrips(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteTrip = async (id) => {
  try {
    await axios.delete(
  `https://route-craft-10.onrender.com/delete-trip/${id}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
    fetchTrips();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32 px-4 sm:px-6 lg:px-10">
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

     <div className="mb-12">

  <h1 className="text-2xl md:text-2xl md:text-3xl sm:text-4xl md:text-5xl font-black">
    My Trips
  </h1>

  <p className="text-slate-400 mt-3 text-base md:text-lg">
    View and manage all your AI-generated travel plans.
  </p>

</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
    <p className="text-slate-400 text-sm">Total Trips</p>
    <h2 className="text-2xl md:text-3xl font-black mt-2">🧳 {totalTrips}</h2>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
    <p className="text-slate-400 text-sm">Average Budget</p>
    <h2 className="text-2xl md:text-3xl font-black mt-2">💰 ₹{averageBudget}</h2>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
    <p className="text-slate-400 text-sm">Total Days</p>
    <h2 className="text-2xl md:text-3xl font-black mt-2">📅 {totalDays}</h2>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
    <p className="text-slate-400 text-sm">Travel Plans</p>
    <h2 className="text-2xl md:text-3xl font-black mt-2">🌍 {totalTrips}</h2>
  </div>
  <div className="mb-10">
  <input
    type="text"
    placeholder="🔍 Search destination..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      bg-white/5
      border
      border-white/10
      rounded-2xl
      px-4 md:px-6 py-3 md:py-4
      text-white
      placeholder:text-slate-400
      focus:outline-none
      focus:border-cyan-400
      transition
    "
  />
</div>
<div className="flex flex-wrap gap-3 mb-10">

  {["All", "Solo", "Family", "Friends", "Couple"].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`
        px-4 md:px-5 py-2 text-sm md:text-base
        rounded-full
        transition
        ${
          filter === type
            ? "bg-cyan-500 text-white"
            : "bg-white/5 text-slate-300 hover:bg-white/10"
        }
      `}
    >
      {type}
    </button>
  ))}

</div>
<div className="mb-8">
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="
      bg-white/5
      border
      border-white/10
      rounded-xl
      px-5
      py-3
      text-white
      focus:outline-none
      focus:border-cyan-400
    "
  >
    <option value="latest" className="text-black">
      Latest First
    </option>

    <option value="oldest" className="text-black">
      Oldest First
    </option>

    <option value="budgetHigh" className="text-black">
      Budget: High → Low
    </option>

    <option value="budgetLow" className="text-black">
      Budget: Low → High
    </option>
  </select>
</div>

</div>
      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">

  <div className="text-7xl">
    🧳
  </div>

  <h2 className="text-2xl md:text-3xl font-bold mt-6">
    No Trips Yet
  </h2>

  <p className="text-slate-400 mt-3">
    Start planning your first adventure with RouteCraft.
  </p>
  

</div>
      ) : (
       trips
  .filter((trip) =>
    trip.destination
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((trip) =>
  filter === "All"
    ? true
    : trip.travelType === filter
)
.sort((a, b) => {
  switch (sortBy) {
    case "latest":
      return new Date(b.createdAt) - new Date(a.createdAt);

    case "oldest":
      return new Date(a.createdAt) - new Date(b.createdAt);

    case "budgetHigh":
      return b.budget - a.budget;

    case "budgetLow":
      return a.budget - b.budget;

    default:
      return 0;
  }
})
.map((trip) => (
          <div
            key={trip._id}
            className="
group
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-4 md:p-6
mb-5
transition-all
duration-300
hover:-translate-y-2
hover:border-cyan-400
hover:shadow-2xl
"
          >
           <div className="mb-6">

  <h2 className="text-2xl md:text-3xl font-black text-white">
    {trip.destination}
  </h2>

  <p className="text-slate-400 mt-2 flex items-center gap-2">
     India
  </p>

</div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 gap-4 mt-6">

  <div className="bg-white/5 rounded-xl p-4">
    <p className="text-slate-400 text-sm">Budget</p>
    <p className="text-xl font-bold">
      ₹{trip.budget}
    </p>
  </div>

  <div className="bg-white/5 rounded-xl p-4">
    <p className="text-slate-400 text-sm">Duration</p>
    <p className="text-xl font-bold">
      {trip.days} Days
    </p>
  </div>

  <div className="bg-white/5 rounded-xl p-4">
    <p className="text-slate-400 text-sm">Travel Type</p>
    <p className="text-xl font-bold">
      {trip.travelType}
    </p>
  </div>
  

</div>
<div className="flex items-center justify-between mt-8 flex-wrap gap-4">

  <p className="text-slate-500 text-sm">
    📅 Created on {new Date(trip.createdAt).toLocaleDateString()}
  </p>

  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

    <button
  onClick={() => setSelectedTrip(trip)}
  className="
  w-full sm:w-auto
  px-6
  py-3
  rounded-xl
  bg-cyan-500
  hover:bg-cyan-400
  text-white
  font-semibold
  transition-all
  duration-300
  "
>
  View Itinerary →
</button>

    <button
  onClick={() => deleteTrip(trip._id)}
  className="
  w-full sm:w-auto
  px-6
  py-3
  rounded-xl
  bg-red-600
  hover:bg-red-700
  text-white
  font-semibold
  transition-all
  duration-300
  "
>
  🗑 Delete
</button>

  </div>

</div>
          </div>
        ))
      )}
{selectedTrip && (
  <div
    className="
    fixed
    inset-0
    bg-black/70
    flex
    items-center
    justify-center
    z-50
    p-4 md:p-6
    "
  >
    <div
      className="
      bg-white
      rounded-3xl
      w-full
      max-w-6xl
      max-h-[95vh]
      overflow-y-auto
      p-5 md:p-10
      relative
      "
    >
      <button
        onClick={() => setSelectedTrip(null)}
        className="
absolute
top-3 right-3 md:top-6 md:right-6
w-12
h-12
rounded-full
bg-slate-100
hover:bg-red-500
hover:text-white
transition
text-2xl
font-bold
"
      >
        ✕
      </button>

      <div className="flex items-center justify-between mb-6">

  <h2 className="text-2xl md:text-4xl font-black text-black">
    📍 {selectedTrip.destination}
  </h2>

 

</div>
      <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selectedTrip.destination
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
  inline-flex
  items-center
  gap-2
  mb-6
  px-5
  py-3
  rounded-xl
  bg-blue-600
  hover:bg-blue-700
  text-white
  font-semibold
  transition
  "
>
  🗺 Open in Google Maps
</a>

<button
  onClick={() => {
    navigator.clipboard.writeText(selectedTrip.itinerary);
    toast.success("Itinerary copied successfully!");
  }}
  className="
  w-full sm:w-auto
  mt-3 sm:mt-0 sm:ml-3
  inline-flex
  items-center
  gap-2
  px-5
  py-3
  rounded-xl
  bg-emerald-600
  hover:bg-emerald-700
  text-white
  font-semibold
  transition
  "
>
  📋 Copy Itinerary
</button>

      <div className="prose max-w-none">
        <div
  className="
  w-full sm:w-auto
  prose
  prose-lg
  max-w-none
  text-gray-800

  prose-headings:text-cyan-600
  prose-headings:font-bold

  prose-h1:text-2xl md:text-4xl
  prose-h2:text-2xl md:text-2xl md:text-3xl
  prose-h3:text-2xl

  prose-p:leading-8
  prose-p:text-gray-700

  prose-li:my-2
  prose-ul:pl-5
  "
>
  <div
  className="
  prose
  prose-lg
  max-w-none
  prose-headings:text-cyan-600
  prose-headings:font-bold
  prose-h1:text-2xl md:text-4xl
  prose-h2:text-2xl md:text-2xl md:text-3xl
  prose-h3:text-2xl
  prose-p:text-gray-700
  prose-p:leading-8
  prose-li:my-2
  prose-ul:pl-5
  "
>
</div>
  <ReactMarkdown>
    {selectedTrip.itinerary}
  </ReactMarkdown>
</div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default MyTrips;