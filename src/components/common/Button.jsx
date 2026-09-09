// frontend/src/components/common/Button.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  href,
  onClick,
  icon,
  className = "",
  download,
  magnetic = false,
}) => {
  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!magnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    x.set(0);
    y.set(0);
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 ${className}`;
  const variantClasses =
    variant === "primary"
      ? "bg-accent-gold text-dark-200 hover:bg-yellow-400 shadow-lg shadow-accent-gold/25"
      : "border border-white/20 text-white hover:bg-white/5";

  const motionProps = {
    whileHover: { scale: magnetic ? 1 : 1.05 },
    whileTap: { scale: 0.95 },
    style: magnetic ? { x: springX, y: springY } : undefined,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseClasses} ${variantClasses}`}
        {...motionProps}
      >
        {icon && <span>{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variantClasses}`}
      {...motionProps}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;