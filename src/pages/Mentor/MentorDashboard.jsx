import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaInbox, FaUsers, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const profileRef = useRef(null);
  const tooltipRef = useRef(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target) &&
          tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowProfileTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, Mentor!</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
                <p className="text-3xl font-bold mt-2">3</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-700">Active Mentees</h3>
                <p className="text-3xl font-bold mt-2">5</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-700">Upcoming Sessions</h3>
                <p className="text-3xl font-bold mt-2">2</p>
              </div>
            </div>
          </div>
        );
      case 'Requests':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentorship Requests</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">New Requests (3)</h3>
                <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="font-medium">Alex Morgan</p>
                  <p className="text-gray-600 text-sm mt-1">Looking for guidance on startup funding...</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
                      Accept
                    </button>
                    <button className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <p className="font-medium">Taylor Smith</p>
                  <p className="text-gray-600 text-sm mt-1">Need help with business model canvas...</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
                      Accept
                    </button>
                    <button className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Entrepreneurs':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Aspiring Entrepreneurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                    SJ
                  </div>
                  <div>
                    <p className="font-bold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Sustainable Fashion</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Hello! I'm an aspiring entrepreneur looking to launch a sustainable fashion brand. I'd love guidance on building a business plan and finding funding."
                </p>
                <div className="flex space-x-2">
                  <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Message
                  </button>
                  <button className="text-sm border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 font-bold">
                    RK
                  </div>
                  <div>
                    <p className="font-bold">Raj Kumar</p>
                    <p className="text-sm text-gray-500">EdTech Platform</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I'm developing an AI-powered learning platform and need advice on product-market fit and scaling strategies. Would appreciate your insights!"
                </p>
                <div className="flex space-x-2">
                  <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Message
                  </button>
                  <button className="text-sm border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD]  text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h2 className="text-xl font-bold"></h2>}
          <button
            onClick={toggleSidebar}
            className="text-white p-2 rounded-full hover:bg-[#817773] transition-colors"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => setActiveTab('Dashboard')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'Dashboard' ? 'bg-[#817773] ' : 'hover:bg-[#817773]'}`}
              >
                <FaHome size={18} />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('Requests')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'Requests' ? 'bg-[#817773]' : 'hover:bg-[#817773]'}`}
              >
                <FaInbox size={18} />
                {isSidebarOpen && <span className="ml-3">Requests</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('Entrepreneurs')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'Entrepreneurs' ? 'bg-[#817773]' : 'hover:bg-[#817773]'}`}
              >
                <FaUsers size={18} />
                {isSidebarOpen && <span className="ml-3">Entrepreneurs</span>}
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Profile Section */}
        <div className="p-4 border-t border-[#817773] relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileTooltip(!showProfileTooltip)}
            className="flex items-center w-full p-2 rounded-lg hover:bg-[#817773] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#817773] font-bold">
              MP
            </div>
            {isSidebarOpen && (
              <div className="ml-3 text-left">
                <p className="font-medium">Mentor</p>
              
              </div>
            )}
          </button>

          {/* Custom Tooltip */}
          {showProfileTooltip && (
            <div 
              ref={tooltipRef}
              className={`absolute ${isSidebarOpen ? 'left-64' : 'left-20'} bottom-0 ml-2 w-48 bg-white shadow-lg rounded-md z-10 overflow-hidden`}
            >
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaCog className="mr-2" /> Settings
                </button>
                <Link to="/" className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                  <FaSignOutAlt className="mr-2" /> Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm p-4 flex items-center">
          <h1 className="text-xl font-bold text-gray-800">{activeTab}</h1>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard; 