import { motion } from "framer-motion";

const Loader = ({ fullScreen = true, message = "" }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated logo mark */}
      <div className="relative w-12 h-12">
        <motion.span
          className="absolute inset-0 border-2 border-amber-400 rounded-sm"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-2 border border-amber-400/40 rounded-sm"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="w-1.5 h-1.5 bg-amber-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </span>
      </div>

      {message && (
        <motion.p
          className="text-sm text-white/40 tracking-widest uppercase font-light"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (!fullScreen) return content;

  return (
    <div className="fixed inset-0 bg-[#0d0f14] z-50 flex items-center justify-center">
      {content}
    </div>
  );
};

export default Loader;