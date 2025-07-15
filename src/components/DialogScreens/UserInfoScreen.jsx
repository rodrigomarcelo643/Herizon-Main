export default function UserInfoScreen({
  formData,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        User Information
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Please provide some basic information to get started
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Type
          </label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            placeholder="What's your business about?"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            required
          >
            <option value="">Select your experience</option>
            <option value="beginner">Just starting out</option>
            <option value="intermediate">1-3 years in business</option>
            <option value="experienced">3+ years in business</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#5C5C5C] hover:bg-[#4A4A4A] text-white cursor-pointer py-3 px-4 rounded-full font-medium transition-colors duration-200 mt-6"
        >
          Continue to Dashboard
        </button>
      </form>
    </div>
  );
}