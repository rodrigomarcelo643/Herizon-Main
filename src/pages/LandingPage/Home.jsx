import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HeroSection from "./sections/HeroSection";
import SecondSection from "./sections/SecondSection";
import Dialog from "../../components/Dialog";
import MentorDisplaySection from "./sections/MentorDisplaySection";
import AIVideo from './sections/AIVideo';
import Footer from "../../components/Footer";
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
      <Footer />
      <Dialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </div>
  );
}
