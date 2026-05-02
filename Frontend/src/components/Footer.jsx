import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-400 rounded-sm flex items-center justify-center">
              <span className="text-gray-900 font-black text-xs">V</span>
            </span>
            <span className="text-white/80 font-semibold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Vibe
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link to="/feed" className="hover:text-white/60 transition-colors">Feed</Link>
            <Link to="/create" className="hover:text-white/60 transition-colors">Create</Link>
            <Link to="/profile" className="hover:text-white/60 transition-colors">Profile</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/20 tracking-wide">
            © {new Date().getFullYear()} Vibe. All rights reserved.
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-8 flex items-center gap-3">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;