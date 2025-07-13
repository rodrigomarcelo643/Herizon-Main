import { motion } from 'framer-motion';
import womenImage from '../../assets/images/women_landing_page.svg'
import { Link } from 'react-router-dom';
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const imageVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 10,
      delay: 0.3
    }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function HeroSection({ onGetStartedClick, onAIClick }) {
  return (
    <section className="bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] relative overflow-hidden">
      <div className="pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-6 text-left">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Empowering<br />
                Women to Reach<br />
                <motion.span 
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  New Horizon
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white not-first-of-type:max-w-md"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
              >
                AI-powered support for women entrepreneurs with tools, mentorship, and financial literacy to start or grow their business.
              </motion.p>
              
              <motion.h2 
                className="text-3xl font-semibold text-white mt-4"
                variants={itemVariants}
                transition={{ delay: 0.3 }}
              >
                Start. Learn. Lead.
              </motion.h2>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-6"
                variants={itemVariants}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  className="bg-[#E1D7CD] hover:bg-[#D0C4B8] px-8 py-3 rounded-full text-md font-medium transition-colors duration-200"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onGetStartedClick}
                >
                  Get Started
                </motion.button>
                <motion.button 
                  className="border-2 border-white text-white hover:bg-[#E1D7CD]/20 px-8 py-3 rounded-full text-md font-medium transition-colors duration-200"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onAIClick}
                >
                  Talk to Our AI Assistant
                </motion.button>
              </motion.div>
            </div>
            
            {/* Right Image */}
            <motion.div 
              className="md:w-1/2 flex justify-center relative"
              variants={imageVariants}
            >
              <motion.img 
                src={womenImage} 
                className="w-full max-w-[400px] mb-[-50px] relative z-10" 
                alt="Women entrepreneurs collaborating"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.5
                }}
              />
              {/* Floating circles in background */}
              <motion.div 
                className="absolute -z-10 w-64 h-64 rounded-full bg-[#E1D7CD]/20 -left-10 -bottom-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
              />
              <motion.div 
                className="absolute -z-10 w-40 h-40 rounded-full bg-[#817773]/30 -right-10 top-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating animated elements */}
      <motion.div 
        className="absolute w-32 h-32 rounded-full bg-[#E1D7CD]/10 top-1/4 left-10"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute w-20 h-20 rounded-full bg-[#817773]/20 bottom-1/3 right-20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </section>
  );
}