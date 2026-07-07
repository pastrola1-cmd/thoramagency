"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useEffect } from "react";

// ─── Animation Variants ───
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── Animated Gradient Mesh Background ───
function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary cyan orb — slow drift */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
          top: "-10%",
          right: "-15%",
        }}
        animate={{
          x: [0, 30, -20, 10, 0],
          y: [0, -25, 15, -10, 0],
          scale: [1, 1.08, 0.95, 1.03, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary deep blue orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, rgba(20, 30, 51, 0.3) 50%, transparent 70%)",
          bottom: "-20%",
          left: "-10%",
        }}
        animate={{
          x: [0, -20, 25, -15, 0],
          y: [0, 20, -10, 25, 0],
          scale: [1, 0.96, 1.06, 0.98, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small accent orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)",
          top: "40%",
          left: "30%",
        }}
        animate={{
          x: [0, 40, -30, 20, 0],
          y: [0, -30, 20, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void to-transparent" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}

// ─── Magnetic Button ───
function MagneticButton({
  children,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    variant === "primary"
      ? "btn btn-primary text-base px-8 py-4 rounded-xl"
      : "btn btn-secondary text-base px-8 py-4 rounded-xl";

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

// ─── Floating Particles ───
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-500/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero Component ───
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <GradientMesh />
      <FloatingParticles />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUpVariant} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-border bg-cyan-glow/50 text-cyan-400 text-body-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Growth Engine
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUpVariant}
          className="font-display text-display-xl md:text-display-2xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-ice">Growth,</span>{" "}
          <span className="text-gradient-cyan">Engineered.</span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          variants={lineVariant}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8 origin-center"
        />

        {/* Subheadline */}
        <motion.p
          variants={fadeUpVariant}
          className="text-body-lg md:text-body-xl text-frost max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We combine{" "}
          <span className="text-ice font-medium">AI, software, automation, and marketing</span>{" "}
          to help ambitious companies generate more customers, increase revenue,
          and scale faster.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton variant="primary">
            Book Strategy Call
            <ArrowRight className="w-4 h-4 ml-1" />
          </MagneticButton>

          <MagneticButton variant="secondary">
            <Play className="w-4 h-4 mr-1 fill-current" />
            See Our Platform
          </MagneticButton>
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "300%", label: "Average ROI" },
            { value: "10x", label: "Lead Generation" },
            { value: "50+", label: "Companies Scaled" },
            { value: "98%", label: "Client Retention" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4 + i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="font-display text-display-sm md:text-display-md text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-body-xs text-mist mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-body-xs text-mist uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-steel flex items-start justify-center p-1"
          animate={{}}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-500"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
