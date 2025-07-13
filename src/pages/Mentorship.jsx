import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Dialog from '../components/Dialog';

const mentors = [
  {
    name: "JADE IAN LUCERO",
    title: "Marketing Strategist — SWU",
    rating: "5.0 /5.0",
    expertise: "Expertise in Financial Planning",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    tags: ["marketing", "finance", "strategy"]
  },
  {
    name: "SARAH JOHNSON",
    title: "Business Consultant — Google",
    rating: "4.9 /5.0",
    expertise: "Expertise in Startup Growth",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    tags: ["startups", "business", "consulting"]
  },
  {
    name: "MICHAEL CHEN",
    title: "Financial Advisor — Goldman Sachs",
    rating: "5.0 /5.0",
    expertise: "Expertise in Investment Strategies",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["finance", "investments", "wealth"]
  },
  {
    name: "EMMA WILSON",
    title: "Tech Entrepreneur — Microsoft",
    rating: "4.8 /5.0",
    expertise: "Expertise in Product Development",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["tech", "product", "entrepreneurship"]
  },
  {
    name: "DAVID KIM",
    title: "UX Designer — Apple",
    rating: "4.7 /5.0",
    expertise: "Expertise in User Experience",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["design", "ux", "ui"]
  },
  {
    name: "LISA WONG",
    title: "Data Scientist — Netflix",
    rating: "4.9 /5.0",
    expertise: "Expertise in Machine Learning",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    tags: ["data", "ai", "analytics"]
  }
];

export default function Mentorship() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [isSearching, setIsSearching] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === filteredMentors.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredMentors.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMentors(mentors);
      return;
    }

    setIsSearching(true);
    setShowLoading(true);

    const timer = setTimeout(() => {
      const results = mentors.filter(mentor => 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      setFilteredMentors(results);
      setCurrentIndex(0);
      setIsSearching(false);
      setShowLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getVisibleMentors = () => {
    if (filteredMentors.length === 0) return [];
    
    let visibleMentors = [];
    for (let i = 0; i < Math.min(3, filteredMentors.length); i++) {
      const index = (currentIndex + i) % filteredMentors.length;
      visibleMentors.push(filteredMentors[index]);
    }
    return visibleMentors;
  };

  const LoadingDots = () => {
    const dots = [0, 1, 2];
    
    return (
      <div className="flex justify-center items-center space-x-2 h-20">
        {dots.map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  };

  const handleRequestMentor = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    } else {
      // Logic for when user is logged in
      console.log("User is logged in, proceed with mentor request");
      // Here you could show a different dialog or navigate to a request form
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginDialog(false);
    setIsLoggedIn(true);
    // After login, you might want to automatically proceed with the request
    handleRequestMentor();
  };

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] py-20 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Find Your Mentor</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Connect with experienced professionals who can guide you in your career journey
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12 relative"
          >
            <input
              type="text"
              placeholder="Search mentors by name, expertise, or industry..."
              className="w-full px-6 py-4 rounded-full border-none text-white border-2 border-white shadow-lg focus:ring-2 focus:ring-[#E1D7CD] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute right-6 top-1/2 transform -translate-y-1/2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>

          <div className="relative min-h-96">
            {showLoading ? (
              <LoadingDots />
            ) : filteredMentors.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold text-white">
                  No mentors found matching your search
                </h3>
                <p className="text-white mt-2">
                  Try different keywords or browse all mentors
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-white text-[#817773] px-6 py-2 rounded-full font-medium"
                >
                  Show All Mentors
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                  {getVisibleMentors().map((mentor, index) => (
                    <motion.div
                      key={`${mentor.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="h-80 overflow-hidden">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                        <p className="text-gray-600 mt-1">{mentor.title}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500 font-bold">{mentor.rating}</span>
                        </div>
                        <p className="text-gray-700 mt-3">{mentor.expertise}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {mentor.tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="bg-[#E1D7CD] text-[#817773] px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredMentors.length > 3 && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 z-10 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 z-10 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {filteredMentors.length > 3 && (
            <div className="flex justify-center mt-8 gap-2">
              {filteredMentors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          >
            <button 
              onClick={handleRequestMentor}
              className="bg-[#E1D7CD] hover:bg-[#D0C4B8] px-8 py-3 rounded-full text-md font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Request a Mentor
            </button>
          </motion.div>
        </div>
      </section>

      <Dialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}