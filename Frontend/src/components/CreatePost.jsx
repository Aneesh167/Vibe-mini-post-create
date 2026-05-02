import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPost } from "../API/post.api";
import Button from "./Button";

const CreatePost = ({ onSuccess }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required.");
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.content);
      if (image) fd.append("image", image);
      const data = await createPost(fd);
      setSuccess(true);
      setForm({ title: "", content: "" });
      setImage(null);
      setPreview(null);
      onSuccess?.(data);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#13151c] border border-white/[0.07] rounded-sm p-8"
    >
      <h2
        className="text-xl font-semibold text-white mb-6 tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Share something
      </h2>

      {/* Title */}
      <div className="mb-5">
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          placeholder="What's on your mind?"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3
            text-sm text-white placeholder-white/20 outline-none
            focus:border-amber-400/40 focus:bg-white/[0.06] transition-all duration-200"
        />
      </div>

      {/* Content */}
      <div className="mb-5">
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
          Content
        </label>
        <textarea
          rows={4}
          value={form.content}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          placeholder="Tell your story..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3
            text-sm text-white placeholder-white/20 outline-none resize-none
            focus:border-amber-400/40 focus:bg-white/[0.06] transition-all duration-200"
        />
      </div>

      {/* Image upload */}
      <div className="mb-6">
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
          Image
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="relative border border-dashed border-white/[0.12] rounded-sm p-6
            text-center cursor-pointer hover:border-amber-400/30 hover:bg-amber-400/[0.02]
            transition-all duration-200 group overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-sm object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-sm flex items-center justify-center
                    text-white/60 hover:text-white hover:bg-black/80 transition-all"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <svg
                  className="w-8 h-8 text-white/20 group-hover:text-amber-400/40 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xs text-white/30">
                  Drop image or click to upload
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-400 mb-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Success */}
      <AnimatePresence>
        {success && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-emerald-400 mb-4"
          >
            ✓ Post published successfully!
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" loading={loading} fullWidth>
        Publish Post
      </Button>
    </motion.form>
  );
};

export default CreatePost;
