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
import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setErr("");
      setStep(2);
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setErr("");
      setStep(3);
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setErr("");
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">

      {/* LEFT – BRAND / TRUST PANEL */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700" />

        <div className="relative z-10 max-w-lg px-10 text-center animate-fade-up">
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            Hostel Hungry
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Securely recover your account and continue managing
            food, essentials, and hostel services without interruption.
          </p>

          <p className="mt-10 text-sm text-white/50">
            Secure recovery · OTP protected · Student-first
          </p>
        </div>
      </div>

      {/* RIGHT – CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-gray-50">
        <div
          className="w-full max-w-md bg-white rounded-3xl
                     border border-black/5 shadow-xl p-8
                     animate-fade-up transition-all duration-300"
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <IoIosArrowRoundBack
              size={32}
              className="cursor-pointer text-gray-700 hover:text-black transition"
              onClick={() => navigate("/signin")}
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Forgot password
              </h2>
              <p className="text-sm text-gray-500">
                Recover access to your account
              </p>
            </div>
          </div>

          {/* STEP 1 – EMAIL */}
          {step === 1 && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-gray-200
                           px-4 py-3 outline-none transition
                           focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="mt-6 w-full rounded-full bg-black
                           text-white py-3 font-medium
                           transition hover:bg-black/90 active:scale-[0.98]"
              >
                {loading ? <ClipLoader size={18} color="white" /> : "Send OTP"}
              </button>
            </div>
          )}

          {/* STEP 2 – OTP */}
          {step === 2 && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                One-time password (OTP)
              </label>
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-gray-200
                           px-4 py-3 outline-none transition
                           focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="mt-6 w-full rounded-full bg-black
                           text-white py-3 font-medium
                           transition hover:bg-black/90 active:scale-[0.98]"
              >
                {loading ? <ClipLoader size={18} color="white" /> : "Verify OTP"}
              </button>
            </div>
          )}

          {/* STEP 3 – RESET */}
          {step === 3 && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                New password
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-gray-200
                           px-4 py-3 outline-none transition
                           focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="Create new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label className="mt-4 block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-gray-200
                           px-4 py-3 outline-none transition
                           focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="mt-6 w-full rounded-full bg-black
                           text-white py-3 font-medium
                           transition hover:bg-black/90 active:scale-[0.98]"
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
            <p className="mt-4 text-sm text-red-500 text-center animate-fade-up">
              * {err}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;



