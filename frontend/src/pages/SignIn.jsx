//shamoel code 
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom"; // Link added for clean UI
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Logic untouched as requested
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { email: result.user.email },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-white selection:bg-black selection:text-white">
      
      {/* --- LEFT SIDE: BRANDING (Apple Aesthetic) --- */}
      <div className="hidden lg:flex w-1/2 bg-[#fbfbfd] items-center justify-center p-20 relative overflow-hidden border-r border-gray-100">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-50" />
        <div className="relative z-10 max-w-md animate-fade-up">
          <div 
            onClick={() => navigate("/")} 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black cursor-pointer transition-colors mb-12"
          >
            <FaArrowLeft /> Back to Home
          </div>
          <div className="flex flex-col leading-[0.85] mb-8">
              <span className="font-black text-6xl tracking-tighter text-black">HOSTEL</span>
              <span className="text-xl font-bold text-gray-300 tracking-[0.4em] uppercase ml-1">HUNGRY</span>
          </div>
          <h2 className="text-3xl font-light text-gray-500 leading-tight mb-6">
            Fueling your <span className="italic font-medium text-black">campus grind</span> with every delivery.
          </h2>
          <div className="flex gap-2">
            <div className="h-1 w-12 bg-black rounded-full" />
            <div className="h-1 w-4 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: PREMIUM FORM UI --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-24 py-12">
        <div className="w-full max-w-[400px] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          
          <header className="mb-12 text-center lg:text-left">
            <h1 className="text-[32px] font-black tracking-tight text-black mb-3">Sign in.</h1>
            <p className="text-gray-400 font-medium text-sm">Enter your credentials to access your secure portal.</p>
          </header>

          <div className="space-y-6">
            {/* Advanced Input: Email */}
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1 group-focus-within:text-black transition-colors">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4.5 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-[6px] focus:ring-black/[0.02]"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Advanced Input: Password */}
            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-black transition-colors">
                  Password
                </label>
                <span 
                  onClick={() => navigate("/forgot-password")}
                  className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-300 hover:text-black cursor-pointer transition"
                >
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4.5 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-[6px] focus:ring-black/[0.02]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
                >
                  {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {err && (
            <div className="mt-6 p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center gap-3 animate-fade-up">
               <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
               <p className="text-red-600 text-[11px] font-bold uppercase tracking-wider leading-none">{err}</p>
            </div>
          )}

          {/* Action Stack */}
          <div className="mt-10 space-y-4">
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="group relative w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all hover:bg-[#1d1d1f] active:scale-[0.98] shadow-2xl shadow-black/10 flex items-center justify-center min-h-[60px]"
            >
              <span className="relative z-10">{loading ? <ClipLoader size={18} color="white" /> : "Authorize Access"}</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <div className="relative py-6 flex items-center justify-center text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative bg-white px-5 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Identity Verification</span>
            </div>

            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 rounded-[22px] border-2 border-gray-100 py-4.5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:bg-gray-50 hover:text-black hover:border-black/5 transition-all active:scale-[0.98]"
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>
          </div>

          <footer className="mt-16 text-center">
            <p className="text-[12px] font-medium text-gray-400">
              New here?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="font-black text-black uppercase tracking-widest ml-1 cursor-pointer hover:underline underline-offset-4"
              >
                Join Now
              </span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignIn;










