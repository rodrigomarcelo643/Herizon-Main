import { motion } from 'framer-motion';
import phoneMockup from '../../../assets/images/phone_mockup.svg';
import {Link}  from 'react-router-dom';
export default function SecondSection() {
  return (
    <section className="py-20 bg-[linear-gradient(to_right,#817773,#D2C0B2),url('/assets/images/bg-herizon-ai.png')] relative overflow-x-hidden">
      {/* Background decorative elements */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full bg-[#E1D7CD]/10 -left-10 md:-left-20 top-1/4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute w-32 h-32 rounded-full bg-[#817773]/20 -right-8 md:-right-16 bottom-1/4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Top Text Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-12">
          {/* Left Top Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="px-2"
          >
            <h2 className="text-3xl sm:text-4xl mt-4 md:text-5xl text-[#F9F5F0]">
              With the help of<br />
              HERIZON AI,<br />
              turn ideas into<br />
              action.
            </h2>
          </motion.div>

          {/* Right Top Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="px-2 md:text-right"
          >
            <h3 className="text-2xl sm:text-3xl mt-4 md:text-4xl text-[#1F2937]">
              Learn Business,<br />
              Your Way
            </h3>
          </motion.div>
        </div>

        {/* Center Phone Mockup */}
        <motion.div
          className="flex justify-center mt-[-240px] px-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img 
            src={phoneMockup} 
            className="w-full max-w-[550px] sm:max-w-[480px] md:max-w-[490px]" 
            alt="Herizon AI app mockup" 
          />
        </motion.div>

        {/* Bottom Content Row */}
        <div>
          {/* Left Bottom Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="px-2 flex justify-center md:justify-start"
          >
          </motion.div>

          {/* Right Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="px-2 md:text-left"
          >
            <div className="w-full flex flex-row items-center justify-between text-xl font-montserrat pl-16">
              <button className="font-montserrat border-2 border-[#E1D7CD] transform hover:scale-105 hover:border-[#ffffff] transition-all ease-in-out rounded-full py-3 px-11 text-white cursor-pointer">
                <Link to="/chat">
                Try Herizon AI
              </Link>
              </button>
              <p className="text-[#1F2937]">Herizon AI gives women the power to <br/>
                <span className="text-white">learn </span>business skills,
                <span className="text-white"> gain </span>confidence <br/>
                and<span className="text-white"> build </span>sustainable businesses, one<br/>
                smart step at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}