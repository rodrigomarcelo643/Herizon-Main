import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/herizon.svg";
import LoginScreen from "./DialogScreens/LoginScreen";
import RoleSelectionScreen from "./DialogScreens/RoleSelectionScreen";
import UserInfoScreen from "./DialogScreens/UserInfoScreen";
import MentorInfoScreen from "./DialogScreens/MentorInfoScreen";
import { backdropVariants, dialogVariants } from "./DialogScreens/DialogStyles";

export default function Dialog({ isOpen, onClose }) {
  const [authStep, setAuthStep] = useState("login");
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
    fullName: "",
    businessType: "",
    experienceLevel: "",
    professionalTitle: "",
    expertiseAreas: "",
    yearsOfExperience: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in initiated");
    setAuthStep("role");
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === "user") {
      setAuthStep("user-info");
    } else {
      setAuthStep("mentor-info");
    }
  };

  const handleRegularLogin = (e) => {
    e.preventDefault();
    console.log("Regular login:", formData.username, formData.password);
    setAuthStep("role");
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    console.log("User info submitted:", formData);
    navigate("/dashboard");
    onClose();
  };

  const handleMentorInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Mentor info submitted:", formData);
    navigate("/dashboard");
    onClose();
  };

  const resetAuthFlow = () => {
    if (authStep === "login") {
      onClose();
    } else {
      setAuthStep("login");
    }
    setSelectedRole(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            variants={{}}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-white rounded-[30px] shadow-xl w-full max-w-[600px] p-8 relative"
              variants={dialogVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={resetAuthFlow}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex justify-center mb-4">
                <img src={logo} alt="Herizon logo" className="h-12" />
              </div>

              {authStep === "login" && (
                <LoginScreen
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleRegularLogin={handleRegularLogin}
                  handleGoogleSignIn={handleGoogleSignIn}
                />
              )}

              {authStep === "role" && (
                <RoleSelectionScreen handleRoleSelect={handleRoleSelect} />
              )}

              {authStep === "user-info" && (
                <UserInfoScreen
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleUserInfoSubmit}
                />
              )}

              {authStep === "mentor-info" && (
                <MentorInfoScreen
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleMentorInfoSubmit}
                />
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}