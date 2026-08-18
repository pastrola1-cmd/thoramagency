"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = "", duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    { value: 120, suffix: "+", label: "Projects Completed" },
    { value: 45, suffix: "+", label: "Happy Clients" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 8, suffix: "+", label: "Countries Served" },
    { value: 12, suffix: "+", label: "AI Solutions Delivered" },
  ];

  return (
    <section className="section bg-void relative overflow-hidden py-20 border-b border-steel/30">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariant}
              className="flex flex-col justify-center items-center p-6 rounded-2xl border border-steel/20 bg-graphite/40 backdrop-blur-sm group hover:border-cyan-border/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-display text-display-md lg:text-display-lg text-cyan-400 font-extrabold group-hover:text-cyan-300 transition-colors duration-300">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-body-xs text-frost group-hover:text-ice mt-2 font-mono uppercase tracking-wider transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
