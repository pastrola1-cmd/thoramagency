import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import SelectedWork from "@/components/SelectedWork";
import ProcessSection from "@/components/ProcessSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-cyan-500/30 selection:text-white">
      <Hero />
      <TrustBar />
      <ServicesSection />
      <SelectedWork />
      <ProcessSection />
      <WhyUsSection />
      <ContactSection />
    </main>
  );
}
