import { motion } from "framer-motion";
import StaticIcons from "../assets/images/static-socmed-icons.svg";
import {Link} from "react-router-dom";

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
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-start md:justify-start">
              <h1 className="font-crushed text-7xl">HERIZON AI</h1>
               <p className="text-white text-sm pt-4 max-w-md mx-auto md:mx-0">
              Empowering  Women to Reach New Horizon
            </p>
            </div>
            <div className="flex flex-row gap-16">
              <ul className="font-montserrat-light">
                <p className="font-bold">Product</p>
                <li className="mt-4"><Link to="/chat">AI Assistant</Link></li>
                <li><Link to="/mentorship">Mentorship</Link></li>
                <li><Link to="/pricing">Subscription</Link></li>
            
              </ul>
               <ul className='font-montserrat-light'>
                <p className="font-bold">Company</p>
                <li className="mt-4 ">About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
              <ul>
                <p className="font-bold">Social Links</p>
                <img className="mt-5" src={StaticIcons} />
              </ul>
              
            </div>
          </div>
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
