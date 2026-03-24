import { Hero } from "@/components/sections/Hero";
import { MirrorSection } from "@/components/sections/MirrorSection";
import { Pillars } from "@/components/sections/Pillars";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MirrorSection />
      <Pillars />
      <About />
      <Gallery />
      <CTA />
    </>
  );
}
