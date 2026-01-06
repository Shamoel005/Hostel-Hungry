/*import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function SignIn() {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false)
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr]=useState("")
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
     const handleSignIn=async () => {
        setLoading(true)
        try {
            const result=await axios.post(`${serverUrl}/api/auth/signin`,{
                email,password
            },{withCredentials:true})
           dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
        } catch (error) {
           setErr(error?.response?.data?.message)
           setLoading(false)
        }
     }
     const handleGoogleAuth=async () => {
             const provider=new GoogleAuthProvider()
             const result=await signInWithPopup(auth,provider)
       try {
         const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
             email:result.user.email,
         },{withCredentials:true})
         dispatch(setUserData(data))
       } catch (error) {
         console.log(error)
       }
          }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{
                border: `1px solid ${borderColor}`
            }}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
                <p className='text-gray-600 mb-8'> Sign In to your account to get started with delicious food deliveries
                </p>

              
                { email }

                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                </div>
                {password}

                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none pr-10' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value)} value={password} required/>

                        <button className='absolute right-3 cursor-pointer top-[14px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>
                <div className='text-right mb-4 cursor-pointer text-[#ff4d2d] font-medium' onClick={()=>navigate("/forgot-password")}>
                  Forgot Password
                </div>
              

            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignIn} disabled={loading}>
                {loading?<ClipLoader size={20} color='white'/>:"Sign In"}
            </button>
      {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}

            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition cursor-pointer duration-200 border-gray-400 hover:bg-gray-100' onClick={handleGoogleAuth}>
<FcGoogle size={20}/>
<span>Sign In with Google</span>
            </button>
            <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account ?  <span className='text-[#ff4d2d]'>Sign Up</span></p>
            </div>
        </div>
    )
}

export default SignIn*/ 


import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { motion } from "framer-motion";

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔒 LOGIN LOGIC (UNCHANGED)
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setErr("");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { email: result.user.email },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* ================= LEFT PANEL ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="hidden md:flex flex-col justify-center px-20
                   bg-gradient-to-b from-gray-700 to-gray-900 text-white"
      >
        <div className="text-xl tracking-tight select-none">
          <span className="font-semibold">Hostel</span>
          <span className="font-light ml-1 text-white/80">Hungry</span>
        </div>

        <h1 className="mt-10 text-4xl font-semibold leading-tight">
          Everything a student needs,
          <br />
          in one simple platform.
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-md">
          Manage food, daily essentials, stationery, groceries and hostel
          services from a single, reliable account designed for campus life.
        </p>

        <p className="mt-10 text-sm text-white/50">
          Trusted by students across multiple campuses
        </p>
      </motion.div>

      {/* ================= RIGHT PANEL ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center px-6 bg-white"
      >
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Continue to your Hostel Hungry account
          </p>

          {/* EMAIL */}
          <motion.div className="mt-8" whileFocus={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-full border border-gray-300
                         px-5 py-3 text-sm transition
                         focus:outline-none focus:border-black"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          {/* PASSWORD */}
          <motion.div className="mt-5" whileFocus={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-full border border-gray-300
                           px-5 py-3 pr-12 text-sm transition
                           focus:outline-none focus:border-black"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-[14px] text-gray-500"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </motion.div>

          {/* FORGOT */}
          <div
            className="mt-3 text-right text-sm text-gray-600
                       hover:text-black cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </div>

          {/* SIGN IN */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignIn}
            disabled={loading}
            className="mt-6 w-full rounded-full
                       border border-black
                       px-6 py-3 text-sm font-medium
                       transition hover:bg-black hover:text-white"
          >
            {loading ? <ClipLoader size={18} /> : "Sign in"}
          </motion.button>

          {/* ERROR */}
          {err && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-red-500"
            >
              {err}
            </motion.p>
          )}

          {/* GOOGLE */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleGoogleAuth}
            className="mt-4 w-full rounded-full
                       border border-gray-300
                       px-6 py-3 text-sm font-medium
                       flex items-center justify-center gap-2
                       hover:bg-gray-50 transition"
          >
            <FcGoogle size={18} />
            Continue with Google
          </motion.button>

          {/* SIGN UP */}
          <p
            className="mt-6 text-sm text-center text-gray-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            New here?{" "}
            <span className="text-black font-medium hover:underline">
              Create account
            </span>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;







