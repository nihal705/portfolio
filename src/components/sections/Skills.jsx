// frontend/src/components/sections/Skills.jsx
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { skillsData } from "../../data/skillsData";

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  const controls = useAnimationControls();
  const allSkills = [...skillsData, ...skillsData];

  // Pause/resume the marquee on hover
  const handleHoverStart = () => {
    setHovered(true);
    controls.stop();
  };
  const handleHoverEnd = () => {
    setHovered(false);
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    });
  };

  return (
    <section id="skills" className="w-full px-4 sm:px-6 py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="section-title">
          <span className="text-accent-gold">/</span> Skills & Technologies
        </h2>

        {/* Single Infinite Scrolling Row */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-200 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-200 to-transparent z-10" />

          <motion.div
            className="flex gap-6 whitespace-nowrap w-max"
            animate={controls}
            initial={{ x: "0%" }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            style={{ width: "max-content" }}
          >
            {allSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                whileHover={{
                  scale: 1.15,
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="glass rounded-xl px-8 py-5 flex items-center gap-4 border border-white/5 flex-shrink-0 cursor-pointer"
                style={{ borderColor: skill.color + "44" }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 object-contain"
                  style={{ filter: `drop-shadow(0 0 12px ${skill.color}40)` }}
                />
                <span className="text-base font-medium text-gray-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* The old <style> block is removed */}
      </motion.div>
    </section>
  );
};

export default Skills;