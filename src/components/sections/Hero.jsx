// frontend/src/components/sections/Hero.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiArrowDown, FiMail } from "react-icons/fi";
import { profileData } from "../../data/profile";
import LottieAnimation from "../ui/LottieAnimation";
import Button from "../common/Button";

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor-following glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Blinking cursor effect (as before)
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Fetch Lottie animation (only local, no fallback CDN)
  useEffect(() => {
    fetch("/animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, []);

  // Mouse tracking for glow
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background with subtle gradient and glow */}
      <div className="absolute inset-0 bg-dark-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Cursor-following glow */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute w-64 h-64 rounded-full bg-accent-gold/10 blur-3xl pointer-events-none"
      />

      {animationData && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <LottieAnimation
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="w-full h-full"
            speed={0.5}
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column – Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                <span className="text-white">Hello,</span>
                <br />
                <span className="text-white">I'm </span>
                <span className="text-accent-gold drop-shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                  {profileData.name}
                </span>
              </h1>
            </div>

            <p className="text-gray-400 max-w-md leading-relaxed">
              {profileData.bio}
            </p>

            {/* Buttons with magnetic hover using Button component */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                href="#contact"
                icon={<FiMail size={18} />}
                magnetic
              >
                Let's Talk
              </Button>
              <Button
                variant="secondary"
                href="/assets/resume.pdf"
                download
                magnetic
              >
                Resume
              </Button>
            </div>
          </motion.div>

          {/* Right Column – Enhanced Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-1.5 border border-white/10 shadow-2xl shadow-accent-gold/5"
            >
              <div className="bg-dark-100/90 rounded-xl overflow-hidden backdrop-blur-sm">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2 font-mono">
                      developer.js
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 font-mono">
                    v1.0.0
                  </span>
                </div>

                {/* Code Content with animated cursor */}
                <div className="p-6 font-mono text-sm text-gray-300 space-y-1">
                  <div>
                    <span className="text-purple-400">const</span> developer ={" "}
                    {"{"}
                  </div>
                  <div className="ml-4">
                    <span className="text-blue-400">name</span>:{" "}
                    <span className="text-green-400">'{profileData.name}'</span>
                    ,
                  </div>
                  <div className="ml-4">
                    <span className="text-blue-400">skills</span>: [
                    <span className="text-yellow-400">'Java'</span>,{" "}
                    <span className="text-yellow-400">'JavaScript'</span>,{" "}
                    <span className="text-yellow-400">'React'</span>,{" "}
                    <span className="text-yellow-400">'SQL'</span>,{" "}
                    <span className="text-yellow-400">'Python'</span>,{" "}
                    <span className="text-yellow-400">'Node.js'</span>],
                  </div>
                  <div className="ml-4">
                    <span className="text-blue-400">passion</span>:{" "}
                    <span className="text-green-400">
                      'Building elegant solutions'
                    </span>
                  </div>
                  <div>{"}"}</div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-green-400">//</span>
                    <span className="text-gray-500">
                      Code. Learn. Build. Repeat.
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${cursorVisible ? "bg-green-400" : "bg-transparent"} transition-colors duration-100`}
                    />
                    <span className="text-xs text-gray-500">
                      Ready to collaborate
                    </span>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-gray-500">$</span>
                    <span className="ml-2 text-accent-gold">npm run build</span>
                    <span
                      className={`ml-1 w-2 h-4 bg-accent-gold ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-accent-gold transition-colors"
        >
          <FiArrowDown size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;