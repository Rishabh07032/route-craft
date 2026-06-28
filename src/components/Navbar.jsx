import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  return (
   <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-lg">

     <h1
  onClick={() => navigate("/")}
  className="text-3xl md:text-4xl font-black tracking-[-0.04em] cursor-pointer"
>
  <span className="text-white">Route</span>

  <span className="bg-gradient-to-r from-[#FFD166] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent">
    Craft
  </span>
</h1>


      <div className="flex items-center gap-8 font-medium text-white">

        <Link
          to="/"
          className="cursor-pointer hover:text-cyan-400 hover:scale-105 transition-all duration-300"
        >
          Home
        </Link>

        <Link
          to="/destinations"
          className="cursor-pointer hover:text-cyan-400 hover:scale-105 transition-all duration-300"
        >
          Destinations
        </Link>

        <Link
          to="/planner"
          className="cursor-pointer hover:text-cyan-400 hover:scale-105 transition-all duration-300"
        >
          Planner
        </Link>
        <Link
  to="/my-trips"
  className="cursor-pointer hover:text-cyan-400 hover:scale-105 transition-all duration-300"
>
  My Trips
</Link>

        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="cursor-pointer px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 text-white"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;