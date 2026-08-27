import React, { useState } from 'react';
import { Mail, RotateCcw, ArrowLeft } from 'lucide-react'; // ឬប្រើ react-icons/md, react-icons/fi

const Forgot = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ដាក់ logic សម្រាប់ផ្ញើ reset link នៅទីនេះ
    console.log('Sending reset link to:', email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-cover bg-center p-4" >
      
      {/* Card Form */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
        
        {/* Icon ខាងលើ */}
        <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center mb-4 text-slate-800">
          <RotateCcw className="w-6 h-6" />
        </div>

        {/* ចំណងជើង និង ការពិពណ៌នា */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Enter the email associated with your VoyageQuest account to receive a reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full text-left">
          <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2 uppercase">
            EMAIL ADDRESS
          </label>
          
          {/* Input Field */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="explorer@voyagequest.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-100/70 border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-900 transition"
            />
          </div>

          {/* Button Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#0d2a6b] hover:bg-[#081b47] text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-md transition duration-200"
          >
            SEND RESET LINK
          </button>
        </form>

        {/* Back to Login Link */}
        <a
          href="/login"
          className="mt-6 text-xs font-medium text-slate-700 hover:text-blue-900 flex items-center justify-center gap-1 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </a>
      </div>

      {/* Footer Branding */}
      <div className="mt-8">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          VoyageQuest
        </h1>
      </div>

    </div>
  );
};

export default Forgot;