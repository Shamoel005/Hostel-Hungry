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
import { ClipLoader } from "react-spinners";

function SignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignIn = async () => {
    // UI ONLY – backend optional
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard"); // fake login redirect
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2 bg-white">

      {/* LEFT – BRAND / LANDING STYLE */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-gray-900 to-gray-700 text-white animate-fade-up">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Hostel <span className="text-white/70">Hungry</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-md">
            A student-first platform designed to simplify hostel life.
            Food, essentials, services — everything in one place.
          </p>

          <ul className="mt-10 space-y-3 text-white/70 text-sm">
            <li>✔ Clean & distraction-free experience</li>
            <li>✔ Designed for students & campuses</li>
            <li>✔ Fast, reliable & easy to use</li>
          </ul>
        </div>
      </div>

      {/* RIGHT – LOGIN CARD */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md animate-fade-up">

          {/* LOGO (mobile) */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              Hostel <span className="text-black/60">Hungry</span>
            </h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back — let’s continue
            </p>

            {/* EMAIL */}
            <div className="mt-6">
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
            </div>

            {/* PASSWORD */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 focus:outline-none focus:border-black"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div
              className="mt-3 text-sm text-right text-gray-600 cursor-pointer hover:text-black"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </div>

            {/* SIGN IN */}
            <button
              onClick={handleSignIn}
              className="mt-6 w-full rounded-lg bg-black text-white py-2.5 font-medium transition hover:bg-black/90"
              disabled={loading}
            >
              {loading ? <ClipLoader size={18} color="white" /> : "Sign In"}
            </button>

            {err && (
              <p className="mt-3 text-sm text-red-500 text-center">
                {err}
              </p>
            )}

            {/* GOOGLE */}
            <button
              className="mt-4 w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* SIGN UP */}
            <p className="mt-6 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                className="font-medium text-black cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

