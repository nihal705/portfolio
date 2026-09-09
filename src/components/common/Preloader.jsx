// frontend/src/components/common/Preloader.jsx
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimation from "../ui/LottieAnimation";

const Preloader = ({ show }) => {
  // Use a simple lottie animation or fallback to a spinning logo
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-dark-200 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <LottieAnimation
              animationData={null}   // Will use a placeholder if no animation
              loop={true}
              autoplay={true}
              className="w-24 h-24"
            />
            <p className="text-gray-400 text-sm font-mono">Loading portfolio...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;