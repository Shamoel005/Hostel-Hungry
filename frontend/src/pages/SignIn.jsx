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

//altamash code

// import React, { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../firebase";
// import { ClipLoader } from "react-spinners";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   const handleSignIn = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         `${serverUrl}/api/auth/signin`,
//         { email, password },
//         { withCredentials: true }
//       );
//       dispatch(setUserData(data));
//       navigate("/");
//     } catch (error) {
//       setErr(error?.response?.data?.message || "Unable to sign in");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleAuth = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       const { data } = await axios.post(
//         `${serverUrl}/api/auth/google-auth`,
//         { email: result.user.email },
//         { withCredentials: true }
//       );

//       dispatch(setUserData(data));
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-900">

//       {/* LEFT – BRAND SIDE */}
//       <div className="hidden lg:flex w-1/2 relative items-center justify-center">
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700" />

//         <div className="relative z-10 max-w-lg px-10 text-center animate-fade-up">
//           <h1 className="text-5xl font-semibold tracking-tight text-white">
//             Hostel Hungry
//           </h1>

//           <p className="mt-6 text-lg text-white/70 leading-relaxed">
//             Everything a college student needs — food, essentials,
//             stationery, and hostel services — in one simple experience.
//           </p>

//           <p className="mt-10 text-sm text-white/50">
//             Trusted by students across multiple campuses
//           </p>
//         </div>
//       </div>

//       {/* RIGHT – SIGN IN CARD */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-gray-50">
//         <div
//           className="w-full max-w-md bg-white rounded-3xl
//                      border border-black/5 shadow-xl p-8
//                      animate-fade-up transition-all duration-300"
//         >

//           {/* BRAND HEADER */}
//           <div className="text-center">
//             <div className="text-xl tracking-tight select-none">
//               <span className="font-semibold text-gray-900">Hostel</span>
//               <span className="font-light text-gray-600 ml-1">Hungry</span>
//             </div>

//             <p className="mt-2 text-sm text-gray-500">
//               Sign in to manage your hostel life
//             </p>
//           </div>

//           {/* EMAIL */}
//           <div className="mt-8">
//             <label className="text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="mt-2 w-full rounded-xl border border-gray-200
//                          px-4 py-3 outline-none
//                          transition-all duration-200
//                          focus:border-black focus:ring-2 focus:ring-black/10"
//               placeholder="you@college.edu"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="mt-5">
//             <label className="text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <div className="relative mt-2">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full rounded-xl border border-gray-200
//                            px-4 py-3 pr-12 outline-none
//                            transition-all duration-200
//                            focus:border-black focus:ring-2 focus:ring-black/10"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2
//                            text-gray-500 hover:text-gray-700 transition"
//               >
//                 {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
//               </button>
//             </div>
//           </div>

//           {/* FORGOT */}
//           <div
//             className="mt-4 text-right text-sm text-gray-600
//                        cursor-pointer hover:underline"
//             onClick={() => navigate("/forgot-password")}
//           >
//             Forgot password?
//           </div>

//           {/* SIGN IN */}
//           <button
//             onClick={handleSignIn}
//             disabled={loading}
//             className="mt-6 w-full rounded-full bg-black
//                        text-white py-3 font-medium
//                        transition-all duration-200
//                        hover:bg-black/90 active:scale-[0.98]"
//           >
//             {loading ? <ClipLoader size={18} color="white" /> : "Sign in"}
//           </button>

//           {/* ERROR */}
//           {err && (
//             <p className="mt-4 text-sm text-red-500 text-center animate-fade-up">
//               * {err}
//             </p>
//           )}

//           {/* DIVIDER */}
//           <div className="my-6 flex items-center gap-3">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-xs text-gray-400">OR</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           {/* GOOGLE */}
//           <button
//             onClick={handleGoogleAuth}
//             className="w-full flex items-center justify-center gap-3
//                        rounded-full border border-gray-200 py-3
//                        transition-all duration-200
//                        hover:bg-gray-50 active:scale-[0.98]"
//           >
//             <FcGoogle size={20} />
//             <span className="font-medium text-gray-800">
//               Continue with Google
//             </span>
//           </button>

//           {/* SIGN UP */}
//           <p className="mt-8 text-center text-sm text-gray-600">
//             New to Hostel Hungry?{" "}
//             <span
//               className="font-medium text-black cursor-pointer hover:underline"
//               onClick={() => navigate("/signup")}
//             >
//               Create an account
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


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
                University Email
              </label>
              <input
                type="email"
                className="w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4.5 text-sm font-semibold text-black outline-none transition-all duration-300 focus:bg-white focus:border-black/5 focus:ring-[6px] focus:ring-black/[0.02]"
                placeholder="id@university.edu"
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










