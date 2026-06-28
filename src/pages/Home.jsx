import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatAssistant from "../components/ChatAssistant";
import sikkim1 from "../assets/sikkim1.jpg";
import sikkim2 from "../assets/sikkim2.jpg";
import gangtok from "../assets/gangtok.jpg";
import lachung from "../assets/lachung.jpg";
import gurudongmar from "../assets/gurudongmar.jpg";
import ladakh from "../assets/ladakh.jpg";
import kashmir from "../assets/kashmir.jpg";
import kerala from "../assets/kerala.jpg";
import goa from "../assets/goa.jpg";
import andaman from "../assets/andaman.jpg";
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import AIPlanner from "../components/AIPlanner";
import Destinations from "../components/Destinations";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

const heroSlides = [
  sikkim1,
  sikkim2,
  gangtok,
  lachung,
  gurudongmar,
  ladakh,
  kashmir,
  kerala,
  goa,
  andaman,
];

function Home() {
  const navigate = useNavigate();

  useEffect(()=>
  {
    document.title=`RouteCraft | Let's Get Started`
  },[])

  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
const [fade, setFade] = useState(false);
console.log(currentImage);
 useEffect(() => {
  const interval = setInterval(() => {

    const upcoming = (currentImage + 1) % heroSlides.length;

    setNextImage(upcoming);

    setFade(true);

    setTimeout(() => {
      setCurrentImage(upcoming);
      setFade(false);
    }, 1000);

  }, 8000);

  return () => clearInterval(interval);
}, [currentImage]);
useEffect(() => {
  heroSlides.forEach((image) => {
  const img = new Image();
  img.src = image;
});
}, []);
 return (
<>
   {/* Current Background */}
<div
  className={`fixed inset-0 transition-opacity duration-1000 ${
    fade ? "opacity-0" : "opacity-100"
  }`}
  style={{
    backgroundImage: `url(${heroSlides[currentImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
/>
   {/* Next Background */}
<div
  className={`fixed inset-0 transition-opacity duration-1000 ${
    fade ? "opacity-100" : "opacity-0"
  }`}
  style={{
    backgroundImage: `url(${heroSlides[nextImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
/>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Page Content */}
    <div className="relative z-10">
     <Hero />
<Features />
<Destinations />
<Testimonials />
<CTA />
<Footer />
<ChatAssistant />
    </div>

  </>
);
}

export default Home;