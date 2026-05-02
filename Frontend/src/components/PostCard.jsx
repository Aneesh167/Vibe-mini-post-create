import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deletePost } from "../API/post.api";

const PostCard = ({ post, onDelete, index = 0 }) => {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isOwner = user?._id === post?.author?._id || user?.id === post?.author?._id;

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    setDeleting(true);
    try {
      await deletePost(post._id);
      onDelete?.(post._id);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-[#13151c] border border-white/[0.07] rounded-sm overflow-hidden
        hover:border-amber-400/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5"
    >
      {/* Image */}
      {post?.image && !imageError && (
        <div className="relative overflow-hidden aspect-[16/9] bg-white/5">
          <motion.img
            src={post.image}
            alt={post.title || "Post image"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13151c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Author row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-sm bg-amber-400/10 border border-amber-400/20
              flex items-center justify-center overflow-hidden flex-shrink-0">
              {post?.author?.avatar ? (
                <img src={post.author.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-amber-400 text-xs font-semibold">
                  {post?.author?.username?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-white/80 font-medium leading-tight">
                {post?.author?.username || "Anonymous"}
              </p>
              <p className="text-xs text-white/30 leading-tight">
                {formatDate(post?.createdAt)}
              </p>
            </div>
          </div>

          {/* Delete */}
          {isOwner && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              disabled={deleting}
              className="w-7 h-7 flex items-center justify-center rounded-sm
                text-white/20 hover:text-red-400 hover:bg-red-400/10
                transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              {deleting ? (
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </motion.button>
          )}
        </div>

        {/* Title */}
        {post?.title && (
          <h2 className="text-base font-semibold text-white/90 mb-2 line-clamp-2 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {post.title}
          </h2>
        )}

        {/* Body */}
        {post?.content && (
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
            {post.content}
          </p>
        )}

        {/* Tags / bottom decoration */}
        <div className="mt-4 flex items-center gap-2">
          <span className="w-5 h-px bg-amber-400/30" />
          <span className="text-[10px] text-amber-400/50 uppercase tracking-widest font-medium">
            Post
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;