import GoogleLogo from "../../assets/logo/google-logo.svg";

export default function LoginScreen({
  formData,
  handleInputChange,
  handleRegularLogin,
  handleGoogleSignIn,
}) {
  return (
    <>
      <h1 className="text-center text-lg text-gray-800 mb-6 px-4">
        Welcome Back to Herizon. Your smart business journey continues here. Sign
        in to access your AI tools and mentorship dashboard.
      </h1>

      <form className="space-y-4 mt-5" onSubmit={handleRegularLogin}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            placeholder="Enter Username"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E1D7CD] focus:border-[#D2C0B2] outline-none transition"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-[#E1D7CD] focus:ring-[#E1D7CD] border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <a
            href="#"
            className="text-sm text-[#817773] hover:text-[#D2C0B2]"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5C5C5C] hover:bg-[#4A4A4A] text-white cursor-pointer py-3 px-4 rounded-full font-medium transition-colors duration-200"
        >
          Log in
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-[#D9D9D9] border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-full font-medium transition-colors duration-200"
        >
          <img src={GoogleLogo} className="h-5 w-5" alt="Google logo" />
          Sign in with Google
        </button>

        <div className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-[#817773] hover:text-[#D2C0B2] font-medium"
          >
            Sign up
          </a>
        </div>
      </form>
    </>
  );
}