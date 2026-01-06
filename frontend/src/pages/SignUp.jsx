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

// function SignUp() {
//   const primaryColor = "#ff4d2d";
//   const bgColor = "#fff9f6";
//   const borderColor = "#ddd";

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState("user");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [err, setErr] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   /*  SIGN UP (EMAIL VERIFICATION)  */
//   const handleSignUp = async () => {
//     if (loading) return;

//     if (!fullName || !email || !password || !mobile) {
//       setErr("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await axios.post(
//         `${serverUrl}/api/auth/signup`,
//         { fullName, email, password, mobile, role },
//         { withCredentials: true }
//       );

   
//       setErr("");
//       setSuccess(data?.message || "Please verify your email before login");

     
//       setTimeout(() => {
//         navigate("/signin");
//       }, 3000);
//     } catch (error) {
//       setSuccess("");
//       setErr(error?.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* GOOGLE AUTH */
//   const handleGoogleAuth = async () => {
//     if (loading) return;

//     if (!mobile) {
//       setErr("Mobile number is required for Google signup");
//       return;
//     }

//     try {
//       setLoading(true);
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       const { data } = await axios.post(
//         `${serverUrl}/api/auth/google-auth`,
//         {
//           fullName: result.user.displayName,
//           email: result.user.email,
//           role,
//           mobile,
//         },
//         { withCredentials: true }
//       );

//       // Google users are auto-verified
//       dispatch(setUserData(data));
//       navigate("/home");
//     } catch (error) {
//       setErr("Google sign-in cancelled or failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex items-center justify-center p-4"
//       style={{ backgroundColor: bgColor }}
//     >
//       <div
//         className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
//         style={{ border: `1px solid ${borderColor}` }}
//       >
//         <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
//           Vingo
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Create your account to get started with delicious food deliveries
//         </p>

//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             className="w-full border rounded-lg px-3 py-2"
//             placeholder="Enter your Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full border rounded-lg px-3 py-2"
//             placeholder="Enter your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Mobile*/ }
//        /* <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Mobile
//           </label>
//           <input
//             type="tel"
//             className="w-full border rounded-lg px-3 py-2"
//             placeholder="Enter your Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//        <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full border rounded-lg px-3 py-2 pr-10"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-[14px] text-gray-500"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
//             </button>
//           </div>
//         </div>

//         {/* Role */}
//        <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">Role</label>
//           <div className="flex gap-2">
//             {["user", "owner", "deliveryBoy"].map((r) => (
//               <button
//                 key={r}
//                 type="button"
//                 className="flex-1 border rounded-lg px-3 py-2 font-medium"
//                 onClick={() => setRole(r)}
//                 style={
//                   role === r
//                     ? { backgroundColor: primaryColor, color: "white" }
//                     : { border: `1px solid ${primaryColor}`, color: primaryColor }
//                 }
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Sign Up Button*/ }
//         <button
//           onClick={handleSignUp}
//           disabled={loading}
//           className="w-full font-semibold py-2 rounded-lg bg-[#ff4d2d] text-white hover:bg-[#e64323]"
//         >
//           {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
//         </button>

//         {err && <p className="text-red-500 text-center mt-3">*{err}</p>}
//         {success && (
//           <p className="text-green-600 text-center mt-3">{success}</p>
//         )}

//         {/* Google */}
//         <button
//           disabled={loading}
//           onClick={handleGoogleAuth}
//           className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100"
//         >
//           <FcGoogle size={20} />
//           <span>Sign up with Google</span>
//         </button>

//         <p
//           className="text-center mt-6 cursor-pointer"
//           onClick={() => navigate("/signin")}
//         >
//           Already have an account?{" "}
//           <span className="text-[#ff4d2d]">Sign In</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignUp;



//shamoel commit here

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
    <div className="min-h-screen flex bg-gray-50 lg:bg-gray-900">
      
      {/* LEFT SIDE - HIDDEN ON MOBILE, VISIBLE ON DESKTOP */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700" />
        <div className="relative z-10 max-w-lg px-10 text-center animate-fade-up">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Hostel Hungry</h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Everything a college student needs in one simple experience.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - OPTIMIZED FOR MOBILE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-[2rem] border border-black/5 shadow-2xl p-6 sm:p-10 animate-fade-up">
          
          {/* BRAND HEADER */}
          <div className="text-center mb-8">
            <div className="text-2xl tracking-tight">
              <span className="font-bold text-gray-900">Hostel</span>
              <span className="font-light text-gray-600 ml-1">Hungry</span>
            </div>
            <p className="mt-1 text-sm text-gray-400">Join the student community</p>
          </div>

          <div className="space-y-4">
            {/* INPUT FIELDS */}
            {[
              { label: "Full Name", value: fullName, setter: setFullName, type: "text", placeholder: "Enter name" },
              { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "college@edu.in" },
              { label: "Mobile", value: mobile, setter: setMobile, type: "tel", placeholder: "10-digit number" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">{field.label}</label>
                <input
                  type={field.type}
                  className="mt-1 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                />
              </div>
            ))}

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 pr-12 outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaRegEyeSlash size={20}/> : <FaRegEye size={20}/>}
                </button>
              </div>
            </div>

            {/* ROLE PICKER - BIGGER TOUCH TARGETS FOR MOBILE */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">I am a...</label>
              <div className="flex gap-2 mt-1">
                {["user", "owner", "delivery"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r === "delivery" ? "deliveryBoy" : r)}
                    className={`flex-1 py-3 text-xs font-bold rounded-2xl border transition-all ${
                      (role === r || (role === "deliveryBoy" && r === "delivery"))
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-black text-white py-4 font-bold shadow-xl shadow-black/10 active:scale-95 transition-transform flex justify-center items-center"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up Now"}
          </button>

          {err && <p className="mt-4 text-xs text-red-500 text-center font-medium italic">{err}</p>}
          {success && <p className="mt-4 text-xs text-green-600 text-center font-medium">{success}</p>}

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] font-bold text-gray-300">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-gray-100 py-3.5 hover:bg-gray-50 transition-all active:scale-95"
          >
            <FcGoogle size={22} />
            <span className="font-bold text-gray-700 text-sm">Google Signup</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already a member?{" "}
            <span
              className="font-bold text-black cursor-pointer underline underline-offset-4"
              onClick={() => navigate("/signin")}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
