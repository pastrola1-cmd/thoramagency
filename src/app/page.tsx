import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SelectedWork from "@/components/SelectedWork";
import ProcessSection from "@/components/ProcessSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-cyan-500/20">
      <Hero />
      <ServicesSection />
      <SelectedWork />
      <ProcessSection />
      <WhyUsSection />
      <ContactSection />
    </main>
  );
}
