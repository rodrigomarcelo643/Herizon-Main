import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reactLogo from "../assets/logo/herizon.svg";
import Dialog from "./Dialog";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Navigation items with their respective routes
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Try Herizon AI", path: "/chat" },
    { name: "Mentorship", path: "/mentorship" }
  ];

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky w-full z-50 font-montserrat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">
                <img src={reactLogo} className="h-8 w-auto" alt="Herizon Logo" />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className="text-gray-600 font-bold hover:text-gray-600 px-3 py-2 text-sm"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center">
              <motion.button
                className="cursor-pointer bg-[#E1D7CD] hover:bg-[#D0C4B8] text-gray-800 rounded-full text-sm font-bold"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowLoginDialog(true)}
              >
                <FaUserCircle className="text-3xl"/>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.div
              className="md:hidden flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Animated Hamburger/Close icon */}
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.svg
                      key="hamburger"
                      initial={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="close"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#F9F5F0] shadow-lg">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-[#E1D7CD]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div className="pt-2" variants={menuItemVariants}>
                  <motion.button
                    className="w-full bg-[#E1D7CD] cursor-pointer hover:bg-[#D0C4B8] text-gray-800 px-8 py-3 rounded-full text-md font-medium"
                    variants={buttonVariants}
                    whileHover="hover"
                    onClick={() => {
                      setIsOpen(false);
                      setShowLoginDialog(true);
                    }}
                  >
                    <FaUserCircle/>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Dialog */}
      <Dialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
}