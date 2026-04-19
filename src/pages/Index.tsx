import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhyTeamSection } from "@/components/sections/WhyTeamSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { ImplementationSection } from "@/components/sections/ImplementationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <TeamSection />
        <WhyTeamSection />
        <RoadmapSection />
        <ImplementationSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
