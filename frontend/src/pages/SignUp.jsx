import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HANDLERS (Same Logic) ================= */
  const handleSignUp = async () => {
    if (loading) return;
    if (!fullName || !email || !password || !mobile) {
      setErr("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );
      setErr("");
      setSuccess(data?.message || "Please verify your email before login");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (error) {
      setSuccess("");
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (loading) return;
    if (!mobile) {
      setErr("Mobile number is required for Google signup");
      return;
    }
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { fullName: result.user.displayName, email: result.user.email, role, mobile },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
      navigate("/home");
    } catch (error) {
      setErr("Google sign-in cancelled or failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white selection:bg-black selection:text-white">
      
      {/* --- LEFT SIDE: BRANDING (Fixed Name) --- */}
      <div className="hidden lg:flex w-[40%] bg-[#fbfbfd] items-center justify-center p-20 relative overflow-hidden border-r border-gray-100">
        <div className="relative z-10 animate-fade-up">
          <div onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black cursor-pointer transition-colors mb-20">
            <FaArrowLeft /> Back to Home
          </div>
          
          <div className="flex flex-col leading-[0.85] mb-10">
              <span className="font-black text-6xl tracking-tighter text-black uppercase">Hostel</span>
              <span className="text-xl font-bold text-gray-300 tracking-[0.4em] uppercase ml-1 mt-2">Hungry</span>
          </div>
          
          <p className="text-2xl font-light text-gray-500 leading-tight mb-8 max-w-sm">
            Everything a student needs — <span className="italic font-medium text-black">food, essentials, and services</span> — in one place.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
               <FaCheckCircle className="text-black" /> Verified University Vendors
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
               <FaCheckCircle className="text-black" /> Instant Campus Delivery
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: PREMIUM FORM --- */}
      <div className="w-full lg:w-[60%] flex items-center justify-center px-8 lg:px-24 py-12">
        <div className="w-full max-w-[440px] animate-fade-up">
          
          <header className="mb-10 text-center lg:text-left">
            <h1 className="text-[32px] font-black tracking-tight text-black mb-2">Create Account.</h1>
            <p className="text-gray-400 font-medium text-sm">Join the Hostel Hungry community today.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="group md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Full Name</label>
              <input
                type="text"
                className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Email</label>
              <input
                type="email"
                className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]"
                placeholder="university@email.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Mobile</label>
              <input
                type="tel"
                className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]"
                placeholder="Contact Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="group md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]"
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

          <div className="mt-8">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Account Type</label>
            <div className="flex gap-3">
              {["user", "owner", "deliveryBoy"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    role === r 
                    ? "bg-black text-white shadow-lg scale-[1.02]" 
                    : "bg-[#f5f5f7] text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {r === "deliveryBoy" ? "Delivery" : r}
                </button>
              ))}
            </div>
          </div>

          {err && <p className="mt-6 text-red-600 text-[11px] font-black uppercase tracking-widest text-center">⚠️ {err}</p>}
          {success && <p className="mt-6 text-green-600 text-[11px] font-black uppercase tracking-widest text-center">✅ {success}</p>}

          <div className="mt-10 space-y-4">
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-gray-800 active:scale-[0.98] shadow-2xl shadow-black/10 flex items-center justify-center min-h-[60px]"
            >
              {loading ? <ClipLoader size={18} color="white" /> : "Create Account"}
            </button>

            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-[22px] border-2 border-gray-100 py-4.5 font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              <FcGoogle size={18} />
              Google Sign Up
            </button>
          </div>

          <p className="mt-12 text-center text-[12px] font-medium text-gray-400">
            Member already?{" "}
            <span onClick={() => navigate("/signin")} className="font-black text-black uppercase tracking-widest ml-1 cursor-pointer hover:underline underline-offset-4">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
