import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getAllPosts } from "../../API/post.api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostCard from "../../components/PostCard";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const ProfilePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const data = await getAllPosts();
        const all = data.posts || data || [];
        const userPosts = all.filter(
          (p) => p?.author?._id === user?._id || p?.author?._id === user?.id,
        );
        setPosts(userPosts);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUserPosts();
  }, [user]);

  const handleDelete = (id) =>
    setPosts((prev) => prev.filter((p) => p._id !== id));

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 relative"
          >
            {/* Background accent */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-400/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-20 h-20 bg-amber-400/10 border-2 border-amber-400/20
                  rounded-sm flex items-center justify-center overflow-hidden"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className="text-amber-400 text-3xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {user?.username?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d0f14]" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1
                  className="text-3xl font-semibold text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {user?.username}
                </h1>
                <p className="text-sm text-white/40 mb-3">{user?.email}</p>
                <div className="flex items-center gap-4 text-xs text-white/30">
                  {joinDate && <span>Joined {joinDate}</span>}
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-amber-400/50 rounded-full" />
                    {posts.length} post{posts.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Edit button */}
              <Link to="/profile/edit">
                <Button variant="secondary" size="sm">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 mb-12"
          >
            {[
              { label: "Posts", value: posts.length },
              { label: "Following", value: user?.following?.length || 0 },
              { label: "Followers", value: user?.followers?.length || 0 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="bg-[#13151c] border border-white/[0.07] rounded-sm p-5 text-center
                  hover:border-amber-400/20 transition-colors duration-300"
              >
                <p
                  className="text-2xl font-semibold text-amber-400 mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-white/30 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-amber-400/30 via-amber-400/10 to-transparent mb-10 origin-left"
          />

          {/* Posts */}
          <div>
            <h2
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Posts
            </h2>

            {loading ? (
              <div className="py-16 flex justify-center">
                <Loader fullScreen={false} message="Loading" />
              </div>
            ) : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <p className="text-white/30 text-sm mb-4">
                  You haven't posted yet.
                </p>
                <Link to="/create">
                  <Button>Create Your First Post</Button>
                </Link>
              </motion.div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {posts.map((post, i) => (
                  <div key={post._id} className="break-inside-avoid">
                    <PostCard post={post} onDelete={handleDelete} index={i} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
