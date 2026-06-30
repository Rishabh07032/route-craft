import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroBg from "../assets/lachung.jpg";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

function Planner() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [travelType, setTravelType] = useState("Solo");
  const [tripResult, setTripResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tripImages, setTripImages] = useState([]);
const [currentImage, setCurrentImage] = useState(0);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);


useEffect(() => {
  if (tripImages.length === 0) return;

  const interval = setInterval(() => {
    setCurrentImage((prev) =>
      prev === tripImages.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, [tripImages]);

const handleGeneratePlan = async () => {
    if (!destination || !budget || !days) {
      toast.error("Please fill all fields");
      return;
    }

    const tripData = {
      destination,
      budget,
      days,
      travelType,
    };

    try {
      setLoading(true);
      const response = await axios.post(
  "https://route-craft-10.onrender.com/generate-trip",
  tripData,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      console.log("API Response:", response.data);

      if (response.data.itinerary) {
        setTripResult(response.data.itinerary);
        if (response.data.itinerary) {
  setTripResult(response.data.itinerary);
  localStorage.setItem(
  "lastDestination",
  tripData.destination
);
setTripImages(response.data.images);
setCurrentImage(0);  setWeather(response.data.weather);
  setForecast(response.data.forecast);
  console.log("Weather Data:", response.data.weather);
  setLoading(false);
}
        setLoading(false);
      } else {
        toast.error("No itinerary received from backend");
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response) {
        console.log("Backend Error:", error.response.data);
      }
      setLoading(false);

      toast.error("Error generating trip plan");
    }
  };
 const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`AI Trip Plan - ${destination}`, 10, 15);

  const cleanText = tripResult
  ?.replace(/[#*`>]/g, "")
  ?.replace(/\r/g, "")
  ?.replace(/[^\x00-\x7F]/g, "") // emojis & special unicode remove
  ?.replace(/&/g, "")
  ?.replace(/\s+/g, " ")
  ?.trim();

  const lines = doc.splitTextToSize(
    cleanText || "No itinerary available",
    180
  );

  let y = 30;

  lines.forEach((line) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(line, 10, y);
    y += 7;
  });

  doc.save(`${destination}-trip-plan.pdf`);
};

  return (
    
    <div
  className="
  min-h-screen
  pt-24
  md:pt-32
  pb-16
  md:pb-20
  px-4
  md:px-8
  bg-cover
  bg-center
  "
  style={{
    backgroundImage: `url(${heroBg})`,
  }}
>

      
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
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-2xl sm:text-3xl md:text-4xl md:text-5xl font-bold text-center mb-10 text-white">
          AI Trip Planner
        </h1>

        <div
          className="
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-5 md:p-8
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="
              bg-black/40
              border
              border-white/40
              text-white
              font-medium
              placeholder:text-white/80
              p-4
              rounded-xl
              "
            />

            <input
              type="number"
              placeholder="Budget (₹)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="
              bg-black/40
              border
              border-white/20
              text-white
              placeholder:text-white/70
              p-4
              rounded-xl
              "
            />

            <input
              type="number"
              placeholder="Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="
              bg-black/40
              border
              border-white/20
              text-white
              placeholder:text-white/70
              p-4
              rounded-xl
              "
            />

            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="
              bg-black/40
              text-white
              border
              border-gray-300
              p-4
              rounded-xl
              "
            >
              <option value="Solo">Solo</option>
              <option value="Couple">Couple</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
            </select>
          </div>

          <button
  onClick={handleGeneratePlan}
  disabled={loading}
  className="
  mt-8
  w-full
  bg-gradient-to-r from-blue-600 to-cyan-500
  text-white
  py-4
  rounded-xl
  transition
  flex
  items-center
  justify-center
  gap-3
  "
>
  {loading ? (
  <>
    <div className="loader"></div>
    <span>Generating...</span>
  </>
) : (
  "Generate Trip Plan"
)}
</button>
          
          {tripResult && (
  <div
    id="trip-report"
    className="
mt-10
bg-white
rounded-[32px]
border border-gray-200
shadow-2xl
p-5 md:p-10
overflow-hidden
"
  >
             {weather && (
  <div
  className="
  bg-blue-600
  text-white
  p-5
  rounded-2xl
  mb-6
  shadow-lg
  "
>
    <h3 className="text-2xl font-bold mb-3">
      🌤 Current Weather
    </h3>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm opacity-80">Temperature</p>
        <p className="text-xl font-bold">
          {weather.temp}°C
        </p>
      </div>

      <div>
        <p className="text-sm opacity-80">Condition</p>
        <p className="text-xl font-bold">
          {weather.condition}
        </p>
      </div>

      <div>
        <p className="text-sm opacity-80">Humidity</p>
        <p className="text-xl font-bold">
          {weather.humidity}%
        </p>
      </div>

      <div>
        <p className="text-sm opacity-80">Wind</p>
        <p className="text-xl font-bold">
          {weather.wind} m/s
        </p>
      </div>
    </div>
  </div>
)}
{forecast.length > 0 && (
  <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
    <h3 className="text-2xl font-bold mb-4 text-black">
      📅 5-Day Forecast
    </h3>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="
          bg-blue-50
          rounded-xl
          p-4
          text-center
          "
        >
          <p className="font-semibold text-black">
            {day.date}
          </p>

          <p className="text-2xl mt-2">
            🌤️
          </p>

          <p className="font-bold text-black">
            {day.temp}°C
          </p>

          <p className="text-sm text-gray-600">
            {day.condition}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
              {tripImages.length > 0 && (
  <div className="relative mb-6 overflow-hidden rounded-2xl">

    <img
      src={tripImages[currentImage]}
      alt={destination}
      className="
      w-full
      h-60 sm:h-72 md:h-96
      object-cover
      rounded-2xl
      shadow-lg
      transition-all
      duration-700
      "
    />

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {tripImages.map((_, index) => (
        <div
          key={index}
          className={`
            h-2 rounded-full transition-all duration-300
            ${
              currentImage === index
                ? "bg-white w-8"
                : "bg-white/50 w-2"
            }
          `}
        />
      ))}
    </div>

  </div>
)}
            <div className="flex flex-wrap gap-4 mb-8">

  <button
    onClick={downloadPDF}
    className="
    px-4 md:px-8
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
    📄 Download PDF
  </button>

  <button
    className="
    px-4 md:px-8
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
    💾 Save Trip
  </button>

</div>
              <div className="flex items-center justify-between mb-6">

  <div>
    <p className="text-cyan-500 uppercase tracking-[4px] font-semibold">
      RouteCraft AI
    </p>

    <h2 className="text-4xl font-black text-gray-900 mt-2">
      Your Personalized Itinerary
    </h2>
  </div>

  <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold">
    AI Generated
  </span>

</div>

              <div
  className="
  prose
  prose-lg
  max-w-none
  text-gray-800

  prose-headings:text-cyan-600
  prose-headings:font-extrabold

  prose-h1:text-4xl
  prose-h2:text-3xl
  prose-h3:text-2xl

  prose-p:leading-8
  prose-p:text-gray-700

  prose-strong:text-black

  prose-li:my-2
  prose-ul:pl-5

  prose-blockquote:border-cyan-500
  prose-blockquote:text-gray-600

  prose-code:text-cyan-600
"
>
  <ReactMarkdown>{tripResult}</ReactMarkdown>
</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Planner;