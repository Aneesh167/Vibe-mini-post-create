import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../../api/auth.api";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    setError("");
    try {
      const data = await registerUser({ username: form.username, email: form.email, password: form.password });
      login(data.user, data.accessToken);
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "username", label: "Username", type: "text", placeholder: "yourname", autoComplete: "username" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
    { name: "password", label: "Password", type: showPass ? "text" : "password", placeholder: "••••••••", autoComplete: "new-password" },
    { name: "confirm", label: "Confirm Password", type: showPass ? "text" : "password", placeholder: "••••••••", autoComplete: "new-password" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-400/[0.02] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-9 h-9 bg-amber-400 rounded-sm flex items-center justify-center">
              <span className="text-gray-900 font-black text-base">V</span>
            </span>
            <span className="text-white font-semibold tracking-tight text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Vibe
            </span>
          </motion.div>
          <h1 className="text-3xl font-semibold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Join Vibe
          </h1>
          <p className="text-sm text-white/40">Create your account and start sharing</p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-[#13151c] border border-white/[0.07] rounded-sm p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3
                      text-sm text-white placeholder-white/20 outline-none
                      focus:border-amber-400/40 focus:bg-white/[0.06] transition-all duration-200"
                  />
                  {(field.name === "password") && (
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPass ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Password strength hint */}
            {form.password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1"
              >
                {[1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                      form.password.length >= lvl * 3
                        ? lvl <= 2 ? "bg-amber-400" : "bg-emerald-400"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </motion.div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-red-400 bg-red-400/5 border border-red-400/10 rounded-sm px-4 py-2.5">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" loading={loading} fullWidth size="lg">
              Create Account
            </Button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-sm text-white/30"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;