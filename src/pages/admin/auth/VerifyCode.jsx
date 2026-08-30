import React, { useState, useRef } from 'react';
import { Compass, ArrowRight, RotateCw } from 'lucide-react'; // ឬប្រើ react-icons

const VerifyCode = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Handle ការវាយលេខចូល (Auto focus ទៅប្រអប់បន្ទាប់)
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // ប្រសិនបើវាយលេខរួច ឲ្យវាលោតទៅប្រអប់ខាងស្ដាំស្វ័យប្រវត្ត
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle ការលុប (Backspace លោតថយក្រោយ)
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = otp.join('');
    console.log('Submitted OTP:', verificationCode);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative bg-slate-200  ">
      {/* Overlay ពណ៌សស្រាលពីលើ Background */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

      {/* Card Form */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center">
        
        {/* Icon Compass ខាងលើ */}
        <div className="w-12 h-12 rounded-full bg-[#1b3b80] flex items-center justify-center mb-3 text-white shadow-md">
          <Compass className="w-6 h-6" />
        </div>

        {/* Logo Text & Title */}
        <h1 className="text-xl font-bold text-[#1b3b80] tracking-tight mb-2">VoyageQuest</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Verify Your Journey</h2>
        
        {/* Subtitle */}
        <p className="text-xs text-gray-500 mb-1 leading-relaxed px-2">
          We've sent a 4-digit code to your email. Enter it below to confirm your identity.
        </p>
        <span className="text-xs font-medium text-gray-700 block mb-6">
          explorer@example.com
        </span>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          
          {/* OTP 4-Digit Inputs */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition bg-white text-gray-800 shadow-sm"
              />
            ))}
          </div>

          {/* Verify Code Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#a33b1e] hover:bg-[#852e16] text-white font-medium text-sm rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2 mb-6"
          >
            Verify Code <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-xs text-gray-500">
          Didn't receive the code?
          <button 
            type="button" 
            className="mt-1 flex items-center justify-center gap-1 font-semibold text-[#1b3b80] hover:underline mx-auto transition"
          >
            <RotateCw className="w-3 h-3" /> Resend Code
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifyCode;