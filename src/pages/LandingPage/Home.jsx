import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HeroSection from './sections/HeroSection';
import SecondSection from './sections/SecondSection';
import Dialog from '../../components/Dialog';
import MentorDisplaySection from './sections/MentorDisplaySection';
import Footer from '../../components/Footer';
import AIVideo from './sections/AIVideo';
import PersonaLizedJourney from './sections/PersonalizedJourney';
import Testimonials from './sections/Testimonials';
export default function Home() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  const handleAIClick = () => {
    navigate("/chat");
  };

  return (
    <div className="relative">
      <Navbar />
      <HeroSection
        onGetStartedClick={() => setShowLoginDialog(true)}
        onAIClick={handleAIClick}
      />
      <AIVideo />
      <SecondSection />
      <MentorDisplaySection />
      <PersonaLizedJourney />
      <Testimonials />
      <Footer />
      <Dialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </div>
  );
}
