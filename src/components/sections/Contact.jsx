// src/components/sections/Contact.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { sendEmail } from "../../utils/emailService";
import { profileData } from "../../data/profile";
import LogoMyCodeNotes from "../common/LogoMyCodeNotes";
import toast from "react-hot-toast";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const formStartTime = useRef(Date.now());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      formStartTime: formStartTime.current,
    };

    try {
      const result = await sendEmail(payload);
      if (result.success) {
        setSubmitted(true);
        toast.success("Message sent successfully! 🎉");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        formStartTime.current = Date.now();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || "Failed to send message");
        toast.error(result.error || "Failed to send message");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="w-full px-4 sm:px-6 py-20 md:py-28"
      ref={ref}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <h2 className="section-title text-3xl md:text-4xl mb-10">
          <span className="text-accent-gold">/</span> Let's Connect
        </h2>

        <div className="grid lg:grid-cols-[2.3fr_0.7fr] gap-10 lg:gap-14 items-start">
          {/* LEFT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative">
                {/* Honeypot – invisible to humans, bots fill it */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200 text-white text-sm placeholder-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your valid email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200 text-white text-sm placeholder-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200 text-white text-sm placeholder-gray-500 resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm flex items-center gap-2">
                    <FiAlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-gold text-dark-200 rounded-xl font-semibold text-base hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <FiLoader size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* RIGHT SIDE - SOCIAL LINKS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Connect
            </h3>

            <a
              href={profileData.social.github}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 px-4 py-3 glass rounded-xl border border-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/10 transition-all duration-300 group"
            >
              <FiGithub
                size={18}
                className="text-gray-400 group-hover:text-accent-gold transition-colors"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                GitHub
              </span>
            </a>

            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 px-4 py-3 glass rounded-xl border border-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/10 transition-all duration-300 group"
            >
              <FiLinkedin
                size={18}
                className="text-gray-400 group-hover:text-accent-gold transition-colors"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                LinkedIn
              </span>
            </a>

            <a
              href={profileData.social.leetcode}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 px-4 py-3 glass rounded-xl border border-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/10 transition-all duration-300 group"
            >
              <SiLeetcode
                size={18}
                className="text-gray-400 group-hover:text-accent-gold transition-colors"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                LeetCode
              </span>
            </a>

            <a
              href={`mailto:${profileData.social.email}`}
              className="flex items-center gap-3 px-4 py-3 glass rounded-xl border border-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/10 transition-all duration-300 group"
            >
              <FiMail
                size={18}
                className="text-gray-400 group-hover:text-accent-gold transition-colors"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                Email
              </span>
            </a>

            <a
              href="https://mycodenotes.vercel.app"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 px-4 py-3 glass rounded-xl border border-white/5 hover:border-accent-gold/50 hover:bg-accent-gold/10 transition-all duration-300 group"
            >
              <div className="text-gray-400 group-hover:text-accent-gold transition-colors">
                <LogoMyCodeNotes />
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                MyCodeNotes
              </span>
            </a>

            <div className="my-4 border-t border-white/5" />

            <div className="px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">
                  Available for opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;