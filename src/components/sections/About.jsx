// frontend/src/components/sections/About.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { profileData } from "../../data/profile";
import Button from "../common/Button";   // NEW

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="w-full px-4 sm:px-6 py-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="section-title">
          <span className="text-accent-gold">/</span> About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative justify-self-center"
          >
            <div className="relative group">
              <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden border-2 border-accent-gold/30 shadow-[0_0_60px_rgba(255,215,0,0.1)]">
                <img
                  src={profileData.avatar}   // uses data
                  alt={profileData.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-accent-gold via-transparent to-accent-gold opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -inset-1 rounded-2xl border border-accent-gold/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right - About Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 self-start"
          >
            <p className="text-gray-300 leading-relaxed text-base">
              My name is G Nihal, I'm a Computer Science and Engineering (CSE)
              student with a strong interest in Full Stack Development. I enjoy
              building scalable web and mobile applications while continuously
              strengthening my problem-solving skills through Data Structures
              and Algorithms.
            </p>

            <p className="text-gray-300 leading-relaxed">
              My current focus is Full Stack Development, React Native, and Data
              Structures & Algorithms, complemented by hands-on projects that
              strengthen my software engineering skills. I'm also building a
              foundation in Data Science to broaden my technical expertise.
            </p>

            <p className="text-gray-300 leading-relaxed">
              I enjoy learning modern technologies, turning ideas into practical
              software, and continuously improving through real-world projects
              and hands-on development.
            </p>

            {/* Social & Resume */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                href="/assets/resume.pdf"
                download
              >
                Download Resume
              </Button>
              <div className="flex gap-2">
                <a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener"
                  className="p-2.5 glass rounded-lg hover:bg-accent-gold/20 transition-all duration-300 border border-white/5"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href={profileData.social.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="p-2.5 glass rounded-lg hover:bg-accent-gold/20 transition-all duration-300 border border-white/5"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href={profileData.social.leetcode}
                  target="_blank"
                  rel="noopener"
                  className="p-2.5 glass rounded-lg hover:bg-accent-gold/20 transition-all duration-300 border border-white/5"
                >
                  <SiLeetcode size={20} className="text-accent-gold" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;