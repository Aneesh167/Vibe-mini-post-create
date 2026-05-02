import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../API/user.api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const EditProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await updateProfile(form);
      setUser(data.user || { ...user, ...form });
      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Your username",
    },
    { name: "email", label: "Email", type: "email", placeholder: "Your email" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-xs text-amber-400 uppercase tracking-widest mb-2 font-medium">
              Settings
            </p>
            <h1
              className="text-4xl font-semibold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Edit Profile
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="h-px bg-gradient-to-r from-amber-400/30 via-amber-400/10 to-transparent mb-10 origin-left"
          />

          {/* Avatar section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#13151c] border border-white/[0.07] rounded-sm p-6 mb-6 flex items-center gap-5"
          >
            <div className="w-16 h-16 bg-amber-400/10 border-2 border-amber-400/20 rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className="text-amber-400 text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {user?.username?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-white/70 font-medium">
                {user?.username}
              </p>
              <p className="text-xs text-white/30 mt-0.5">{user?.email}</p>
            </div>
          </motion.div>

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
                  transition={{ delay: 0.25 + i * 0.06 }}
                >
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3
                      text-sm text-white placeholder-white/20 outline-none
                      focus:border-amber-400/40 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </motion.div>
              ))}

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.37 }}
              >
                <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell people a bit about yourself..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3
                    text-sm text-white placeholder-white/20 outline-none resize-none
                    focus:border-amber-400/40 focus:bg-white/[0.06] transition-all duration-200"
                />
                <p className="text-xs text-white/20 mt-1 text-right">
                  {form.bio.length}/160
                </p>
              </motion.div>

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

              {/* Success */}
              <AnimatePresence>
                {success && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-emerald-400"
                  >
                    ✓ Profile updated! Redirecting...
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} fullWidth>
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditProfilePage;
