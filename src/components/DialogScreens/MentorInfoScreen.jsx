export default function MentorInfoScreen({
  formData,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Mentor Information
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Please provide your professional details to help us match you with the right mentees
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
            Professional Title
          </label>
          <input
            type="text"
            name="professionalTitle"
            value={formData.professionalTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            placeholder="E.g. Marketing Consultant, Business Coach"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Areas of Expertise
          </label>
          <input
            type="text"
            name="expertiseAreas"
            value={formData.expertiseAreas}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            placeholder="E.g. Marketing, Finance, Startups"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            min="1"
            placeholder="5"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#5C5C5C] hover:bg-[#4A4A4A] text-white cursor-pointer py-3 px-4 rounded-full font-medium transition-colors duration-200 mt-6"
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
}