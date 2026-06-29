import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-3xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl md:text-4xl font-black tracking-[-0.04em] cursor-pointer"
        >
          <span className="text-white">Route</span>
          <span className="bg-gradient-to-r from-[#FFD166] via-[#F4A261] to-[#E76F51] bg-clip-text text-transparent">
            Craft
          </span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-white">
          <Link
            to="/"
            className="hover:text-cyan-400 hover:scale-105 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/destinations"
            className="hover:text-cyan-400 hover:scale-105 transition-all duration-300"
          >
            Destinations
          </Link>

          <Link
            to="/planner"
            className="hover:text-cyan-400 hover:scale-105 transition-all duration-300"
          >
            Planner
          </Link>

          <Link
            to="/my-trips"
            className="hover:text-cyan-400 hover:scale-105 transition-all duration-300"
          >
            My Trips
          </Link>

          {token ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 text-white"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? (
            <X size={30} className="transition-transform duration-300" />
          ) : (
            <Menu size={30} className="transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#07111d]/90 backdrop-blur-2xl border-t border-white/10 flex flex-col">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-4 text-white hover:bg-cyan-500/20 hover:pl-10 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/destinations"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-4 text-white hover:bg-cyan-500/20 hover:pl-10 transition-all duration-300"
          >
            Destinations
          </Link>

          <Link
            to="/planner"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-4 text-white hover:bg-cyan-500/20 hover:pl-10 transition-all duration-300"
          >
            Planner
          </Link>

          <Link
            to="/my-trips"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-4 text-white hover:bg-cyan-500/20 hover:pl-10 transition-all duration-300"
          >
            My Trips
          </Link>

          {token ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setMenuOpen(false);
                navigate("/login");
              }}
              className="text-left px-6 py-4 text-red-400 hover:bg-red-500/20 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-cyan-400 hover:bg-cyan-500/20 hover:pl-10 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;