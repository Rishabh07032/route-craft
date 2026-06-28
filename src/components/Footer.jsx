import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#050816] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black text-white">
              Route<span className="text-cyan-400">Craft</span>
            </h2>

            <p className="text-gray-400 mt-5 leading-7">
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
              ✉ routecraft.ai@gmail.com
            </p>

            <p className="text-gray-400 mt-3">
              📞 +91 XXXXX XXXXX
            </p>

          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2026 RouteCraft. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm mt-3 md:mt-0">
            Designed & Developed by ❤️ Rishabh Singh
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;