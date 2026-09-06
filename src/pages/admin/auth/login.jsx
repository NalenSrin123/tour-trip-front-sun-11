import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">

      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl px-6 py-7">

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-blue-900">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Continue your journey with VoyageQuest.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">

            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>

            <div className="relative">

              {/* Email Icon */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i class="fa-regular fa-envelope"></i>
              </span>

              <input
                type="email"
                placeholder="explorer@example.com"
                className="
                  w-full
                  h-11
                  rounded-md
                  bg-white
                  border border-gray-200
                  pl-10
                  pr-3
                  text-sm
                  outline-none
                  text-gray-700
                  focus:border-blue-700
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

            </div>
          </div>


          {/* Password */}
          <div className="mb-5">

            {/* Password label + forgot */}
            <div className="flex justify-between items-center mb-1.5">

              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>

              <button
                type="button"
                className="text-[10px] text-blue-800 hover:underline"
              >
                Forgot Password?
              </button>

            </div>


            <div className="relative">

              {/* Lock Icon */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i class="fa-solid fa-lock"></i>
              </span>


              {/* Password Input */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="
                  w-full
                  h-11
                  rounded-md
                  bg-white
                  border border-gray-200
                  pl-10
                  pr-10
                  text-sm
                  outline-none
                  text-gray-700
                  focus:border-blue-700
                  focus:ring-2
                  focus:ring-blue-100
                "
              />


              {/* Show Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-gray-600
                "
              >
                {showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}
              </button>

            </div>

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              h-11
              rounded-md
              bg-blue-900
              hover:bg-blue-800
              text-white
              text-sm
              font-semibold
              transition
            "
          >
            Login
          </button>

        </form>


        {/* Divider */}
        <div className="flex items-center gap-3 my-7">

          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-[10px] text-gray-500">
            Or continue with
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>

        </div>


        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">

          {/* Google */}
          <button
            type="button"
            className="
              h-11
              rounded-md
              bg-white
              border border-gray-200
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
            "
          >
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
            </span>
            Google
          </button>


          {/* Facebook */}
          <button
            type="button"
            className="
              h-11
              rounded-md
              bg-blue-600
              hover:bg-blue-700
              text-white
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
            "
          >
            {/* <span className="font-bold">
              f
            </span> */}
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#FFFFFF" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
</svg>
            </span>

            Facebook
          </button>

        </div>


        {/* Sign Up */}
        <p className="text-center text-[10px] text-gray-500 mt-5">

          Don't have an account?

          <button
            type="button"
            className="ml-1 text-blue-800 font-medium hover:underline"
          >
            Sign up
          </button>

        </p>

      </div>

    </div>
  );
}