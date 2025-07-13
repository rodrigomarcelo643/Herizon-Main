export default function RoleSelectionScreen({ handleRoleSelect }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Select Your Role
      </h2>
      <p className="text-center text-gray-600">
        Please choose how you'd like to use Herizon
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => handleRoleSelect("user")}
          className="p-6 border border-gray-200 rounded-xl hover:border-[#D2C0B2] hover:bg-[#F8F4F0] transition-colors text-left"
        >
          <h3 className="font-medium text-lg text-gray-800">User</h3>
          <p className="text-sm text-gray-500 mt-2">
            I'm looking for mentorship and business guidance to grow my venture
          </p>
        </button>
        
        <button
          onClick={() => handleRoleSelect("mentor")}
          className="p-6 border border-gray-200 rounded-xl hover:border-[#D2C0B2] hover:bg-[#F8F4F0] transition-colors text-left"
        >
          <h3 className="font-medium text-lg text-gray-800">Mentor</h3>
          <p className="text-sm text-gray-500 mt-2">
            I'm offering expertise and mentorship to help others succeed
          </p>
        </button>
      </div>
    </div>
  );
}