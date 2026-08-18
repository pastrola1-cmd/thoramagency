"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "The property portal and automated CRM loop built by Thoram Group completely resolved our lead pipeline leaks. Inbound inquiries assign instantly, and client ledger schedules balance perfectly.",
    name: "Emmanuel Olamide Stephen",
    role: "CEO & Founder",
    company: "Nissie Ideal Shelters",
    rating: 5,
  },
  {
    quote: "Manna Bible App operates fully offline in regions with low connectivity. The audio streaming is seamless and cached local databases load scripture indices in less than 200 milliseconds.",
    name: "Pastor Josiah K.",
    role: "Director of Digital Outreach",
    company: "Manna Bible Foundation",
    rating: 5,
  },
  {
    quote: "Educore OS completely automated our tuition invoices, digital grade cards, and parent notifications. We saved our staff over 40+ administrative hours per week.",
    name: "Sarah Jenkins",
    role: "Registrar",
    company: "Educore Academy",
    rating: 5,
  },
  {
    quote: "The LeadFlow AI Agent qualified incoming site traffic logs and generated draft proposals in seconds. Our consult schedule is fully booked and operations require zero manual input.",
    name: "David Cole",
    role: "VP of Operations",
    company: "LeadFlow Systems",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section bg-void py-24 border-b border-steel/30 relative overflow-hidden" id="testimonials">
      {/* Background neon path */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

      <div className="container-tight relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-3 inline-block">Client Success</span>
          <h2 className="font-display text-display-md md:text-display-lg font-bold text-ice">
            What Our Partners Say.
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-2xl mx-auto px-4 md:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-8 md:p-12 rounded-3xl border border-steel/60 hover:border-cyan-border/40 relative shadow-xl min-h-[250px] flex flex-col justify-between"
            >
              {/* Quote Mark */}
              <Quote className="w-16 h-16 text-cyan-500/10 absolute top-4 left-4 pointer-events-none" />

              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-body-sm md:text-body-md text-ice italic leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </p>
              </div>

              {/* Bio Details */}
              <div className="flex items-center justify-between pt-6 border-t border-steel/20 relative z-10">
                <div>
                  <h4 className="font-display text-body-md font-bold text-ice">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-[10px] text-frost mt-0.5 font-mono uppercase tracking-wider">
                    {testimonials[current].role}
                  </p>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">
                  {testimonials[current].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center md:justify-between items-center gap-4 mt-8 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[-60px] md:right-[-60px] md:mt-0 z-20">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-steel bg-glass-white hover:bg-glass-hover hover:border-cyan-border text-ice transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-steel bg-glass-white hover:bg-glass-hover hover:border-cyan-border text-ice transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
