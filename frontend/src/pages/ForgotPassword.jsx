/*import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email,setEmail]=useState("")
  const [otp,setOtp]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [err,setErr]=useState("")
  const navigate=useNavigate()
const [loading,setLoading]=useState(false)
  const handleSendOtp=async () => {
    setLoading(true)
    try {
      const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
      console.log(result)
      setErr("")
      setStep(2)
      setLoading(false)
    } catch (error) {
       setErr(error.response.data.message)
       setLoading(false)
    }
  }
  const handleVerifyOtp=async () => {
      setLoading(true)
    try {
      const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
      console.log(result)
      setErr("")
      setStep(3)
        setLoading(false)
    } catch (error) {
        setErr(error?.response?.data?.message)
          setLoading(false)
    }
  }
  const handleResetPassword=async () => {
    if(newPassword!=confirmPassword){
      return null
    }
    setLoading(true)
    try {
      const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
      setErr("")
      console.log(result)
        setLoading(false)
      navigate("/signin")
    } catch (error) {
     setErr(error?.response?.data?.message)
       setLoading(false)
    }
  }
  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center  gap-4 mb-4'>
          <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={()=>navigate("/signin")}/>
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>
        {step == 1
          &&
          <div>
 <div className='mb-6'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                </div>
                <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSendOtp} disabled={loading}>
                {loading?<ClipLoader size={20} color='white'/>:"Send Otp"}
            </button>
                 {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
          </div>}

         {step == 2
          &&
          <div>
 <div className='mb-6'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>OTP</label>
                    <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)} value={otp} required/>
                </div>
                <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleVerifyOtp} disabled={loading}>
                {loading?<ClipLoader size={20} color='white'/>:"Verify"}
            </button>
                {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
          </div>}
          {step == 3
          &&
          <div>
 <div className='mb-6'>
                    <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                    <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Enter New Password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
                </div>
                <div className='mb-6'>
                    <label htmlFor="ConfirmPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                    <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required/>
                </div>
                <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleResetPassword} disabled={loading}>
                {loading?<ClipLoader size={20} color='white'/>:"Reset Password"}
            </button>
                {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
          </div>}
      </div>
    </div>
  )
}

export default ForgotPassword*/
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const navigate = useNavigate();

  // UI STEPS
  const [step, setStep] = useState(1);

  // FORM STATE
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // UI-ONLY handlers (no backend dependency)
  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setErr("");
      setStep(2);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setErr("");
      setStep(3);
    }, 1200);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/signin");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2 bg-white">

      {/* LEFT – BRAND PANEL */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-gray-900 to-gray-700 text-white animate-fade-up">
        <h1 className="text-4xl font-semibold tracking-tight">
          Hostel <span className="text-white/70">Hungry</span>
        </h1>

        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-md">
          Forgot your password?  
          Don’t worry — resetting it is quick and secure.
        </p>

        <ul className="mt-10 space-y-3 text-white/70 text-sm">
          <li>✔ Secure OTP verification</li>
          <li>✔ Fast & simple recovery</li>
          <li>✔ Back to your account in minutes</li>
        </ul>
      </div>

      {/* RIGHT – CARD */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md animate-fade-up">

          {/* MOBILE LOGO */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              Hostel <span className="text-black/60">Hungry</span>
            </h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
              <IoIosArrowRoundBack
                size={28}
                className="cursor-pointer text-gray-600 hover:text-black"
                onClick={() => navigate("/signin")}
              />
              <h2 className="text-2xl font-semibold text-gray-900">
                Reset password
              </h2>
            </div>

            {/* STEP INDICATOR */}
            <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
              <span className={step >= 1 ? "text-black font-medium" : ""}>
                Email
              </span>
              <span>→</span>
              <span className={step >= 2 ? "text-black font-medium" : ""}>
                OTP
              </span>
              <span>→</span>
              <span className={step === 3 ? "text-black font-medium" : ""}>
                Password
              </span>
            </div>

            {/* STEP 1 – EMAIL */}
            {step === 1 && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="mt-6 w-full rounded-lg bg-black text-white py-2.5 font-medium transition hover:bg-black/90"
                >
                  {loading ? <ClipLoader size={18} color="white" /> : "Send OTP"}
                </button>
              </div>
            )}

            {/* STEP 2 – OTP */}
            {step === 2 && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black tracking-widest"
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="mt-6 w-full rounded-lg bg-black text-white py-2.5 font-medium transition hover:bg-black/90"
                >
                  {loading ? <ClipLoader size={18} color="white" /> : "Verify OTP"}
                </button>
              </div>
            )}

            {/* STEP 3 – NEW PASSWORD */}
            {step === 3 && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  New password
                </label>
                <input
                  type="password"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="text-sm font-medium text-gray-700 mt-4 block">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="mt-6 w-full rounded-lg bg-black text-white py-2.5 font-medium transition hover:bg-black/90"
                >
                  {loading ? (
                    <ClipLoader size={18} color="white" />
                  ) : (
                    "Reset password"
                  )}
                </button>
              </div>
            )}

            {/* ERROR */}
            {err && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {err}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

