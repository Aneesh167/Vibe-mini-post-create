import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



// Reusable fade-up variant
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-4 text-center overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-amber-400/[0.03] rounded-full blur-3xl pointer-events-none" />
        {/* Vertical line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent to-amber-400/20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 bg-amber-400/[0.07] border border-amber-400/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <span className="text-[11px] text-amber-400/80 tracking-widest uppercase font-medium">
              Now live — share your world
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-6xl font-semibold text-white leading-[1.12] tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where your stories
            <br />
            find a <em className="text-amber-400 not-italic">home</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.18)}
            className="text-base text-white/40 max-w-md mx-auto leading-relaxed mb-10"
          >
            Vibe is a clean, distraction-free space to write, share, and connect
            with people who think like you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.24)}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 bg-amber-400 text-gray-900 text-sm font-medium rounded-sm tracking-wide cursor-pointer"
              >
                Start sharing free
              </motion.button>
            </Link>
            <Link to="/feed">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 bg-transparent text-white/60 border border-white/15 text-sm font-medium rounded-sm tracking-wide cursor-pointer hover:border-white/30 transition-colors duration-200"
              >
                Explore the feed
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      
     
      {/* ── CTA BANNER ── */}
      <section className="px-4 pb-20 mt-5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="relative bg-[#13151c] border border-white/[0.07] rounded-sm p-14 text-center overflow-hidden"
          >
            {/* Corner orbs */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-400/[0.04] rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-400/[0.03] rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <h2
                className="text-4xl font-semibold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to find your vibe?
              </h2>
              <p className="text-sm text-white/35 mb-8">
                Join thousands of writers sharing what matters to them.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3.5 bg-amber-400 text-gray-900 text-sm font-medium rounded-sm tracking-wide cursor-pointer"
                  >
                    Create your account
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3.5 bg-transparent text-white/50 border border-white/15 text-sm font-medium rounded-sm tracking-wide cursor-pointer hover:border-white/30 transition-colors duration-200"
                  >
                    Sign in instead
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
