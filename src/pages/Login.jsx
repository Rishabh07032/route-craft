import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import heroBg from "../assets/yumthang.jpg";

function Login() {
  const navigate = useNavigate();

  useEffect(()=>
  {
    document.title='RouteCraft | Login/Register'
  },[])

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleSignup = async () => {
  try {
    const response = await axios.post(
      "https://route-craft-10.onrender.com/signup",
      {
        name,
        email,
        password,
      }
    );

    toast.success(response.data.message);
  } catch (error) {
    toast.error(
  error.response?.data?.message ||
  "Signup Failed"
);
  }
};
const handleLogin = async () => {
  try {
    const response = await axios.post(
      "https://route-craft-10.onrender.com/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

   toast.success("✨ Welcome Back, Explorer!");

setTimeout(() => {
navigate("/", { replace: true });}, 1500);

  } catch (error) {
    console.log(error.response?.data);

   
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
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
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side */}
        <div className="text-white">
          <h1 className="text-6xl font-bold leading-tight">
            Discover
            <br />
            Extraordinary
            <br />
            Journeys
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            AI Powered Travel Planner with smart itineraries,
            destination insights and real-time weather updates.
          </p>

          <div className="flex gap-10 mt-10">
            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-gray-300">Trips Planned</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-gray-300">Destinations</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">95%</h2>
              <p className="text-gray-300">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-10
          shadow-2xl
          "
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          {isSignup && (
  <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="
    w-full
    p-4
    mb-4
    rounded-xl
    bg-white/10
    text-white
    placeholder:text-gray-300
    border
    border-white/20
    "
  />
)}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
onChange={(e) => setEmail(e.target.value)}
            className="
            w-full
            p-4
            mb-4
            rounded-xl
            bg-white/10
            text-white
            placeholder:text-gray-300
            border
            border-white/20
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
onChange={(e) => setPassword(e.target.value)}
            className="
            w-full
            p-4
            mb-6
            rounded-xl
            bg-white/10
            text-white
            placeholder:text-gray-300
            border
            border-white/20
            "
          />

          <button
  onClick={isSignup ? handleSignup : handleLogin}
  className="
  w-full
  bg-gradient-to-r
  from-cyan-500
  to-blue-600
  py-4
  rounded-xl
  text-white
  font-semibold
  hover:scale-105
  transition
  "
>
  {isSignup ? "Sign Up" : "Login"}
</button>

          <div className="mt-6 text-center text-gray-300">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={() => setIsSignup(!isSignup)}
              className="ml-2 text-cyan-400 font-semibold"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;