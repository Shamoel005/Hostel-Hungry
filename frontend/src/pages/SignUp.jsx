/*import React, { useState } from "react";
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

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

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

  /*  SIGN UP (EMAIL VERIFICATION)  */
  /*const handleSignUp = async () => {
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

     
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      setSuccess("");
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  /* GOOGLE AUTH */
  /*const handleGoogleAuth = async () => {
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
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );

      // Google users are auto-verified
      dispatch(setUserData(data));
      navigate("/home");
    } catch (error) {
      setErr("Google sign-in cancelled or failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        {/* Full Name }
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email }
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mobile }
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile
          </label>
          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter your Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Password }
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-[14px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>

        {/* Role }
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                type="button"
                className="flex-1 border rounded-lg px-3 py-2 font-medium"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${primaryColor}`, color: primaryColor }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button }
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
        </button>

        {err && <p className="text-red-500 text-center mt-3">*{err}</p>}
        {success && (
          <p className="text-green-600 text-center mt-3">{success}</p>
        )}

        {/* Google }
        <button
          disabled={loading}
          onClick={handleGoogleAuth}
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;







// import React from 'react'
// import { useState } from 'react';
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// import { serverUrl } from '../App';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { ClipLoader } from "react-spinners"
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function SignUp() {
//     const primaryColor = "#ff4d2d";
//     const hoverColor = "#e64323";
//     const bgColor = "#fff9f6";
//     const borderColor = "#ddd";
//     const [showPassword, setShowPassword] = useState(false)
//     const [role, setRole] = useState("user")
//     const navigate=useNavigate()
//     const [fullName,setFullName]=useState("")
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const [mobile,setMobile]=useState("")
//     const [err,setErr]=useState("")
//     const [loading,setLoading]=useState(false)
//     const dispatch=useDispatch()
//      const handleSignUp=async () => {
//         setLoading(true)
//         try {
//             const result=await axios.post(`${serverUrl}/api/auth/signup`,{
//                 fullName,email,password,mobile,role
//             },{withCredentials:true})
//             dispatch(setUserData(result.data))
//             setErr("")
//             setLoading(false)
//         } catch (error) {
//             setErr(error?.response?.data?.message)
//              setLoading(false)
//         }
//      }

//      const handleGoogleAuth=async () => {
//         if(!mobile){
//           return setErr("mobile no is required")
//         }
//         const provider=new GoogleAuthProvider()
//         const result=await signInWithPopup(auth,provider)
//   try {
//     const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
//         fullName:result.user.displayName,
//         email:result.user.email,
//         role,
//         mobile
//     },{withCredentials:true})
//    dispatch(setUserData(data))
//   } catch (error) {
//     console.log(error)
//   }
//      }
//     return (
//         <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
//             <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{
//                 border: `1px solid ${borderColor}`
//             }}>
//                 <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
//                 <p className='text-gray-600 mb-8'> Create your account to get started with delicious food deliveries
//                 </p>

//                 {/* fullName }

//                 <div className='mb-4'>
//                     <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
//                     <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Full Name' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setFullName(e.target.value)} value={fullName} required/>
//                 </div>
//                 {/* email }

//                 <div className='mb-4'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
//                     <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value)} value={email} required/>
//                 </div>
//                 {/* mobile}

//                 <div className='mb-4'>
//                     <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
//                     <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Mobile Number' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>
//                 </div>
//                 {/* password}

//                 <div className='mb-4'>
//                     <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
//                     <div className='relative'>
//                         <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none pr-10' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value)} value={password} required/>

//                         <button className='absolute right-3 cursor-pointer top-[14px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
//                     </div>
//                 </div>
//                 {/* role}

//                 <div className='mb-4'>
//                     <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
//                     <div className='flex gap-2'>
//                         {["user", "owner", "deliveryBoy"].map((r) => (
//                             <button
//                                 className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer'
//                                 onClick={()=>setRole(r)}
//                                 style={
//                                    role==r?
//                                    {backgroundColor:primaryColor,color:"white"}
//                                    :{border:`1px solid ${primaryColor}`,color:primaryColor}
//                                 }>
//                                 {r}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//             <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignUp} disabled={loading}>
//                 {loading?<ClipLoader size={20} color='white'/>:"Sign Up"}
            
//             </button>
//             {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
            

//             <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition cursor-pointer duration-200 border-gray-400 hover:bg-gray-100' onClick={handleGoogleAuth}>
// <FcGoogle size={20}/>
// <span>Sign up with Google</span>
//             </button>
//             <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account ?  <span className='text-[#ff4d2d]'>Sign In</span></p>
//             </div>
//         </div>
//     )
// }

// export default SignUp*/

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  // UI ONLY – fake signup (backend not required)
  const handleSignUp = () => {
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
          Join a campus-first platform designed for students,
          shop owners, and delivery partners.
        </p>

        <ul className="mt-10 space-y-3 text-white/70 text-sm">
          <li>✔ Clean & modern experience</li>
          <li>✔ Built for hostel life</li>
          <li>✔ Fast onboarding</li>
        </ul>
      </div>

      {/* RIGHT – SIGN UP FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md animate-fade-up">

          {/* MOBILE LOGO */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              Hostel <span className="text-black/60">Hungry</span>
            </h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Get started in less than a minute
            </p>

            {/* FULL NAME */}
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="mt-4">
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

            {/* MOBILE */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">
                Mobile number
              </label>
              <input
                type="tel"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
                  placeholder="Create a password"
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

            {/* ROLE SELECTION */}
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700">
                Choose your role
              </label>

              <div className="mt-3 grid grid-cols-3 gap-3">
                {/* STUDENT */}
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`group rounded-xl py-3 text-sm font-semibold transition-all duration-300
                    ${
                      role === "student"
                        ? "bg-black text-white shadow-lg scale-105"
                        : "bg-white border border-gray-300 text-gray-700 hover:scale-105 hover:shadow-md"
                    }`}
                >
                  🎓 Student
                  <div className="text-[10px] mt-1 opacity-70 group-hover:opacity-100">
                    Order food & services
                  </div>
                </button>

                {/* OWNER */}
                <button
                  type="button"
                  onClick={() => setRole("owner")}
                  className={`group rounded-xl py-3 text-sm font-semibold transition-all duration-300
                    ${
                      role === "owner"
                        ? "bg-black text-white shadow-lg scale-105"
                        : "bg-white border border-gray-300 text-gray-700 hover:scale-105 hover:shadow-md"
                    }`}
                >
                  🏪 Owner
                  <div className="text-[10px] mt-1 opacity-70 group-hover:opacity-100">
                    Manage your store
                  </div>
                </button>

                {/* DELIVERY */}
                <button
                  type="button"
                  onClick={() => setRole("deliveryBoy")}
                  className={`group rounded-xl py-3 text-sm font-semibold transition-all duration-300
                    ${
                      role === "deliveryBoy"
                        ? "bg-black text-white shadow-lg scale-105"
                        : "bg-white border border-gray-300 text-gray-700 hover:scale-105 hover:shadow-md"
                    }`}
                >
                  🚴 Delivery
                  <div className="text-[10px] mt-1 opacity-70 group-hover:opacity-100">
                    Deliver & earn
                  </div>
                </button>
              </div>
            </div>

            {/* SIGN UP BUTTON */}
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-black text-white py-2.5 font-medium transition hover:bg-black/90"
            >
              {loading ? <ClipLoader size={18} color="white" /> : "Create account"}
            </button>

            {/* GOOGLE */}
            <button
              className="mt-4 w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* SIGN IN */}
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="font-medium text-black cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;


