import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiExternalLink, FiChevronRight } from "react-icons/fi";
import { projectsData } from "../../data/projectsData";

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredId, setHoveredId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    // 1. CHANGED: Removed "section-container" and added "w-full" so it spans edge-to-edge.
    // Added "px-4 sm:px-6" so the content doesn't touch the absolute edges of the screen.
    <section id="projects" className="w-full px-4 sm:px-6 py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        // 2. ADDED: "max-w-7xl mx-auto" here.
        // This keeps your Title, Grid, and Footer visually centered on the screen,
        // while the parent section stretches edge-to-edge.
        className="max-w-7xl mx-auto"
      >
        <h2 className="section-title">
          <span className="text-accent-gold">/</span> Projects
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="glass rounded-2xl overflow-hidden group card-hover"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video bg-dark-100">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-dark-100 to-dark-200">
                    {project.icon || "🚀"}
                  </div>
                )}
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Tech stack badge */}
                <div className="absolute top-3 right-3 flex gap-1">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-dark-200/80 backdrop-blur-sm rounded-full text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-dark-200/80 backdrop-blur-sm rounded-full text-gray-400">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <span className="text-2xl">{project.icon}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                  {project.detailsUrl && (
                    <a
                      href={project.detailsUrl}
                      target="_blank"
                      rel="noopener"
                      className="ml-auto text-sm text-accent-gold hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                      Details <FiChevronRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/nihal705"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-gold transition-colors group"
          >
            <FiGithub size={18} />
            <span>View all projects on GitHub</span>
            <FiChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
