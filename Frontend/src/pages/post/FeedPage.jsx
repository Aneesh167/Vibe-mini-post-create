import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllPosts } from "../../API/post.api";
import PostCard from "../../components/PostCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllPosts();
      setPosts(data.posts || data || []);
    } catch {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <p className="text-xs text-amber-400 uppercase tracking-widest mb-2 font-medium">
                Discover
              </p>
              <h1
                className="text-4xl font-semibold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your Feed
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchPosts}
                icon={
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                }
              >
                Refresh
              </Button>
              <Link to="/create">
                <Button size="sm">+ New Post</Button>
              </Link>
            </div>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-amber-400/30 via-amber-400/10 to-transparent mb-10 origin-left"
          />

          {/* Content */}
          {loading ? (
            <div className="py-24 flex justify-center">
              <Loader fullScreen={false} message="Loading posts" />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="text-red-400 mb-4">{error}</p>
              <Button variant="ghost" onClick={fetchPosts}>
                Try Again
              </Button>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center"
            >
              <div className="w-16 h-16 bg-amber-400/5 border border-amber-400/10 rounded-sm mx-auto flex items-center justify-center mb-5">
                <svg
                  className="w-8 h-8 text-amber-400/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <p className="text-white/40 mb-2 text-sm">No posts yet</p>
              <p className="text-white/20 text-xs mb-6">
                Be the first to share something
              </p>
              <Link to="/create">
                <Button>Create First Post</Button>
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
      </main>

      <Footer />
    </div>
  );
};

export default FeedPage;
