import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiGithub,
  FiExternalLink,
  FiChevronRight,
  FiChevronLeft,
  FiX,
  FiImage,
} from "react-icons/fi";
import { projectsData } from "../../data/projectsData";

const MAX_GALLERY_IMAGES = 20;

// "/assets/projects/sabai-pay.png" -> "/assets/projects/sabai-pay"
const getGalleryBase = (imagePath) =>
  imagePath ? imagePath.replace(/\.[^/.]+$/, "") : null;

// "/assets/projects/sabai-pay.png" -> "sabai-pay" (used in #gallery-sabai-pay)
const getSlug = (project) => {
  const base = getGalleryBase(project.image);
  return base ? base.split("/").pop() : null;
};

const imageExists = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

// Looks for base1.png, base2.png, ... and stops at the first missing one
const loadGalleryImages = async (base) => {
  if (!base) return [];
  const found = [];
  for (let i = 1; i <= MAX_GALLERY_IMAGES; i++) {
    const src = `${base}${i}.png`;
    // eslint-disable-next-line no-await-in-loop
    const ok = await imageExists(src);
    if (!ok) break;
    found.push(src);
  }
  return found;
};

const GalleryModal = ({ title, images, onClose }) => {
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close gallery"
      >
        <FiX size={22} />
      </button>

      {/* Title + counter */}
      <div className="absolute top-4 left-4 text-white">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-400">
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Previous */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous image"
        >
          <FiChevronLeft size={26} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-[90vw] sm:max-w-[80vw] object-contain rounded-lg shadow-2xl"
        />
      </AnimatePresence>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next image"
        >
          <FiChevronRight size={26} />
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredId, setHoveredId] = useState(null);
  const [gallery, setGallery] = useState(null); // { title, images }
  const [galleryCache, setGalleryCache] = useState({}); // id -> string[]

  // Check up-front which projects have gallery images, so the badge can show
  useEffect(() => {
    let cancelled = false;
    projectsData
      .filter((p) => !p.liveUrl)
      .forEach(async (p) => {
        const images = await loadGalleryImages(getGalleryBase(p.image));
        if (!cancelled) {
          setGalleryCache((c) => ({ ...c, [p.id]: images }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  // Only projects WITHOUT a live URL get a gallery
  const handleCardClick = async (project) => {
    if (project.liveUrl) return;

    let images = galleryCache[project.id];
    if (!images) {
      images = await loadGalleryImages(getGalleryBase(project.image));
      setGalleryCache((c) => ({ ...c, [project.id]: images }));
    }
    // No numbered images found -> do nothing
    if (images.length === 0) return;

    // Show the main card image first, followed by the numbered ones
    setGallery({ title: project.title, images: [project.image, ...images] });

    // Shareable link, e.g. /#gallery-sabai-pay (no scroll jump, no history entry)
    window.history.replaceState(null, "", `#gallery-${getSlug(project)}`);
  };

  const closeGallery = useCallback(() => {
    setGallery(null);
    if (window.location.hash.startsWith("#gallery-")) {
      window.history.replaceState(null, "", "#projects");
    }
  }, []);

  // Open a gallery directly from a link like /#gallery-sabai-pay
  useEffect(() => {
    const openFromHash = async () => {
      const match = window.location.hash.match(/^#gallery-(.+)$/);
      if (!match) {
        setGallery(null);
        return;
      }
      const project = projectsData.find(
        (p) => !p.liveUrl && getSlug(p) === match[1]
      );
      if (!project) return;

      const images = await loadGalleryImages(getGalleryBase(project.image));
      if (images.length === 0) return;

      setGalleryCache((c) => ({ ...c, [project.id]: images }));
      document.getElementById("projects")?.scrollIntoView();
      setGallery({ title: project.title, images: [project.image, ...images] });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="projects" className="w-full px-4 sm:px-6 py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
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
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(project)}
              className={`glass rounded-2xl overflow-hidden group card-hover ${
                !project.liveUrl ? "cursor-pointer" : ""
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video bg-dark-100">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
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

                {/* Tech stack badges */}
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
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {!project.liveUrl && galleryCache[project.id]?.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/30">
                        <FiImage size={12} />
                        Gallery
                      </span>
                    )}
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* External links – these open in new tabs */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                      aria-label="GitHub link"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                      aria-label="Live demo link"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                  {project.detailsUrl && (
                    <a
                      href={project.detailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto text-sm text-accent-gold hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                      README <FiChevronRight size={14} />
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
            rel="noopener noreferrer"
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

      {/* Image gallery (only for projects without a live URL) */}
      <AnimatePresence>
        {gallery && (
          <GalleryModal
            title={gallery.title}
            images={gallery.images}
            onClose={closeGallery}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;