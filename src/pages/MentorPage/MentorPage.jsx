
import { FaSearch } from "react-icons/fa"
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '../../components/Dialog'; 
import Navbar from '../../components/Navbar';
const mentors = [
  {
    name: "JADE IAN LUCERO",
    title: "Marketing Strategist — SWU",
    rating: "5.0 /5.0",
    expertise: "Expertise in Financial Planning",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
  },
  {
    name: "SARAH JOHNSON",
    title: "Business Consultant — Google",
    rating: "4.9 /5.0",
    expertise: "Expertise in Startup Growth",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
  },
  {
    name: "MICHAEL CHEN",
    title: "Financial Advisor — Goldman Sachs",
    rating: "5.0 /5.0",
    expertise: "Expertise in Investment Strategies",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "EMMA WILSON",
    title: "Tech Entrepreneur — Microsoft",
    rating: "4.8 /5.0",
    expertise: "Expertise in Product Development",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

export default function MentorDisplaySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === mentors.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mentors.length - 1 : prev - 1));
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Get the current 3 mentors to display
  const getVisibleMentors = () => {
    let visibleMentors = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % mentors.length;
      visibleMentors.push(mentors[index]);
    }
    return visibleMentors;
  };

  return (
    <>
    {/**  Navbar Display  */}
    <Navbar/>
    <section className="bg-gradient-to-r from-[#ddd1cc] via-[#a59690] to-[#E1D7CD] py-10 relative overflow-hidden"> 
      {/* Dialog component */}
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} />

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
          <div className="">
                <div className="flex justify-between items-center">
                    <h1 className="font-[Montserrat-Regular] text-[96px] text-white">Mentor</h1>
                    <div className="border flex items-center px-2 ps-4 border-white w-[25%] gap-x-2 rounded-full">
                        <FaSearch className="text-white"/>
                        <input type="text" placeholder="Search" className="w-full py-3 h-full w-full outline-none text-white"/>
                    </div>
                    
                </div>
            </div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Learn from experienced professionals who are passionate about helping women succeed in business
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {getVisibleMentors().map((mentor, index) => (
              <motion.div
                key={`${mentor.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-90 overflow-hidden">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                  <p className="text-gray-600 mt-1">{mentor.title}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 font-bold">{mentor.rating}</span>
                  </div>
                  <p className="text-gray-700 mt-3">{mentor.expertise}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {mentors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <Link to="/mentorship" className="bg-[#E1D7CD] hover:bg-[#D0C4B8] px-8 py-3 rounded-full text-md font-medium transition-colors duration-200">
            Request a Mentor
          </Link>
          <button 
            onClick={openDialog}
            className="border-2 border-white text-white hover:bg-[#E1D7CD]/20 px-8 py-3 rounded-full text-md font-medium transition-colors duration-200"
          >
            Become a Mentor
          </button>
        </motion.div>
      </div>
    </section>
    </>
  );
}