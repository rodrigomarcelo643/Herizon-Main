import { motion } from "framer-motion";
import logo from "../assets/logo/herizon.svg";

const Footer = () => {
  return (
    <footer className="bg-[#817773] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4 text-center md:text-left"
        >
          <div className="flex justify-center md:justify-start items-center">
            <img src={logo} alt="Herizon AI" className="h-8" />
            <span className="ml-2 text-xl font-bold">AI</span>
          </div>
          <p className="text-[#E1D7CD] max-w-md mx-auto md:mx-0">
            Empowering women entrepreneurs with AI tools and mentorship to reach
            new horizons.
          </p>
        </motion.div>

        {/* Divider and Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-[#a59690] mt-12 pt-8 text-center text-[#E1D7CD]"
        >
          <p>© {new Date().getFullYear()} Herizon AI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
