import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#050816] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Route<span className="text-cyan-400">Craft</span>
            </h2>

            <p className="text-gray-400 mt-5 text-sm md:text-base leading-6 md:leading-7">
              AI-powered travel planning for unforgettable journeys across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/planner">Planner</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/my-trips">My Trips</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">

  <li>
    <Link
      to="/privacy"
      className="hover:text-cyan-400 transition"
    >
      Privacy Policy
    </Link>
  </li>

  <li>
    <Link
      to="/terms"
      className="hover:text-cyan-400 transition"
    >
      Terms & Conditions
    </Link>
  </li>

  <li>
    <Link
      to="/faq"
      className="hover:text-cyan-400 transition"
    >
      FAQ
    </Link>
  </li>

</ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Contact
            </h3>

            <p className="text-gray-400">
              📍 Indore, India
            </p>

            <p className="text-gray-400 mt-3">
              ✉ rishabhsinghjjhy77@gmail.com
            </p>

            <p className="text-gray-400 mt-3">
              📞 +91 83404 93941
            </p>

          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-3">

          <p className="text-gray-500 text-xs md:text-sm">
            © 2026 RouteCraft. All rights reserved.
          </p>

          <p className="text-gray-500 text-xs md:text-sm mt-3 md:mt-0">
            Designed & Developed by ❤️ Rishabh Singh
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;