import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../components/CreatePost";
import Footer from "../../components/Footer";
const CreatePostPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => navigate("/feed"), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-xs text-amber-400 uppercase tracking-widest mb-2 font-medium">
              Create
            </p>
            <h1
              className="text-4xl font-semibold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              New Post
            </h1>
            <p className="text-white/40 text-sm mt-2">
              Share your thoughts, stories, or anything you'd like.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="h-px bg-gradient-to-r from-amber-400/30 via-amber-400/10 to-transparent mb-10 origin-left"
          />

          <CreatePost onSuccess={handleSuccess} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatePostPage;
