import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  return (
   <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-3 md:px-8 md:py-4 bg-black/20 backdrop-blur-3xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">

     <h1
  onClick={() => navigate("/")}
  className="text-xl sm:text-2xl md:text-4xl font-black tracking-[-0.04em] cursor-pointer"
>
  <span className="text-white">Route</span>

  <span className="bg-gradient-to-r from-[#FFD166] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent">
    Craft
  </span>
</h1>

      
      <div className="hidden md:flex items-center gap-8 font-medium text-white">
        </div>
        
        {/* Mobile Menu Button */}

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="
  md:hidden
  text-white
  transition-transform
  duration-300
  "
>
  <div
    className={`
      transition-transform
      duration-300
      ${menuOpen ? "rotate-180" : ""}
    `}
  >
    {menuOpen ? <X size={28}/> : <Menu size={28}/>}
  </div>
</button>

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
            className="cursor-pointer px-3 py-2 md:px-5 md:py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer px-3 py-2 md:px-5 md:py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 text-white"
          >
            Login
          </Link>
        )}

        {menuOpen && (
 <div
  className={`
    absolute
    top-full
    left-0
    w-full
    md:hidden
    bg-[#07111d]/80
    backdrop-blur-2xl
    border-b
    border-white/10
    shadow-2xl
    transition-all
    duration-300
    ease-in-out
    ${
      menuOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-5 pointer-events-none"
    }
  `}
>
    <div className="flex flex-col py-4">

      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 text-white hover:bg-cyan-500/20
hover:pl-10
transition-all
duration-300"
      >
        Home
      </Link>

      <Link
        to="/destinations"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 text-white hover:bg-cyan-500/20
hover:pl-10
transition-all
duration-300"
      >
        Destinations
      </Link>

      <Link
        to="/planner"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 text-white hover:bg-cyan-500/20
hover:pl-10
transition-all
duration-300"
      >
        Planner
      </Link>

      <Link
        to="/my-trips"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 text-white hover:bg-cyan-500/20
hover:pl-10
transition-all
duration-300"
      >
        My Trips
      </Link>

      {token ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
            setMenuOpen(false);
          }}
          className="
          text-left
          px-6
          py-4
          text-red-400
          hover:bg-red-500/20
          "
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="
          px-6
          py-4
          text-cyan-400
hover:bg-cyan-500/20
hover:pl-10
transition-all
dur ation-300          "
        >
          Login
        </Link>
      )}

    </div>
  </div>
)}

      


    </nav>
  );
}

export default Navbar;