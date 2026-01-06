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

export default SignIn
*/
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

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  /* ================= SIGN IN ================= */
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
      setErr("");
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE AUTH ================= */
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
    <div className="min-h-screen flex bg-black text-white">

      {/* ================= LEFT (BRAND / HERO) ================= */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-lg text-center animate-fade-up">
          <h1 className="text-5xl font-semibold tracking-tight">
            Hostel Hungry
          </h1>
          <p className="mt-6 text-lg text-white/70">
            One account. All your food, essentials, and hostel services —
            delivered simply.
          </p>
        </div>
      </div>

      {/* ================= RIGHT (SIGN IN CARD) ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white text-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 animate-fade-up">

          <h2 className="text-3xl font-semibold tracking-tight">
            Sign in
          </h2>
          <p className="mt-2 text-gray-500">
            Welcome back. Continue your hostel journey.
          </p>

          {/* EMAIL */}
          <div className="mt-8">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-5">
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* FORGOT */}
          <div
            className="mt-4 text-sm text-right text-black/70 cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </div>

          {/* SIGN IN BUTTON */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-black text-white py-3 font-medium transition hover:bg-black/90"
          >
            {loading ? <ClipLoader size={18} color="white" /> : "Sign in"}
          </button>

          {err && (
            <p className="text-red-500 text-sm text-center mt-4">
              * {err}
            </p>
          )}

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 rounded-full border py-3 transition hover:bg-gray-50"
          >
            <FcGoogle size={20} />
            <span className="font-medium">Sign in with Google</span>
          </button>

          {/* SIGN UP */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-black font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;











