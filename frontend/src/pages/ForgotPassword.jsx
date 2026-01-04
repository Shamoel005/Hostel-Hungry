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
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ===== LOGIC SAME =====
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
      setErr(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
      setErr(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
      setErr(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* ================= LEFT GREY PANEL ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="hidden md:flex flex-col justify-center px-20
                   bg-gradient-to-b from-gray-700 to-gray-900 text-white"
      >
        <div className="text-xl tracking-tight">
          <span className="font-semibold">Hostel</span>
          <span className="font-light text-white/80 ml-1">Hungry</span>
        </div>

        <h1 className="mt-10 text-4xl font-semibold leading-tight">
          Reset your password,
          <br /> get back on track.
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-md">
          Securely reset your password and continue using Hostel Hungry without
          any interruption.
        </p>

        <p className="mt-10 text-sm text-white/50">
          Secure • Simple • Reliable
        </p>
      </motion.div>

      {/* ================= RIGHT FORM ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-center px-6 bg-white"
      >
        <div className="w-full max-w-md">

          {/* BACK */}
          <div
            className="flex items-center gap-2 mb-6 cursor-pointer text-gray-600 hover:text-black"
            onClick={() => navigate("/signin")}
          >
            <IoIosArrowRoundBack size={24} />
            <span className="text-sm">Back to sign in</span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Forgot password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create a new password"}
          </p>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="mt-8">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-full border border-gray-300
                             px-5 py-3 text-sm focus:outline-none focus:border-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="mt-6 w-full rounded-full border border-black
                           px-6 py-3 text-sm font-medium
                           hover:bg-black hover:text-white transition"
              >
                {loading ? <ClipLoader size={18} /> : "Send OTP"}
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="mt-8">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full rounded-full border border-gray-300
                             px-5 py-3 text-sm focus:outline-none focus:border-black"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="mt-6 w-full rounded-full border border-black
                           px-6 py-3 text-sm font-medium
                           hover:bg-black hover:text-white transition"
              >
                {loading ? <ClipLoader size={18} /> : "Verify OTP"}
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="mt-8">
                <input
                  type="password"
                  placeholder="Create new password"
                  className="w-full rounded-full border border-gray-300
                             px-5 py-3 text-sm focus:outline-none focus:border-black"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-full border border-gray-300
                             px-5 py-3 text-sm focus:outline-none focus:border-black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="mt-6 w-full rounded-full border border-black
                           px-6 py-3 text-sm font-medium
                           hover:bg-black hover:text-white transition"
              >
                {loading ? <ClipLoader size={18} /> : "Reset password"}
              </button>
            </>
          )}

          {err && (
            <p className="mt-4 text-sm text-red-500 text-center">
              {err}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}


export default ForgotPassword;

