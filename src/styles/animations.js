export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, type: "spring", stiffness: 200 }
};

export const slideUp = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const cardHover = {
  scale: 1.02,
  boxShadow: "0 0 24px rgba(6,182,212,0.4)",
  transition: { duration: 0.3 }
};

export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 0 32px rgba(6,182,212,0.6)",
  transition: { duration: 0.3 }
};

export const progressFill = (duration = 2) => ({
  initial: { width: "0%" },
  animate: { width: "100%" },
  transition: { duration, ease: "easeInOut" }
});

export const rotateIn = {
  initial: { rotate: -180, scale: 0, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1 },
  transition: { duration: 0.8, type: "spring", stiffness: 200 }
};

export const pulseGlow = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 1, 0.5],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
