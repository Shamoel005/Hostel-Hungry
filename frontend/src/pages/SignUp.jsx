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
 /* const handleGoogleAuth = async () => {
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

        {/* Full Name */}
        /*<div className="mb-4">
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

        {/* Email */}
       /* <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mobile*/ }
       /* <div className="mb-4">
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

        {/* Password */}
       /* <div className="mb-4">
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

        {/* Role */}
       /* <div className="mb-4">
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

        {/* Sign Up Button*/ }
       /* <button
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

        {/* Google */}
        /*<button
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

export default SignUp;*/


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

const SignUp = () => {
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

  /* ================= SIGN UP ================= */
  const handleSignUp = async () => {
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
      setSuccess(data?.message || "Please verify your email");

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

  /* ================= GOOGLE SIGN UP ================= */
  const handleGoogleAuth = async () => {
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
          mobile,
          role,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      navigate("/home");
    } catch {
      setErr("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">

      {/* LEFT – BRAND SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700" />

        <div className="relative z-10 max-w-lg px-10 text-center animate-fade-up">
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            Hostel Hungry
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Join thousands of students managing food, essentials,
            and hostel services — all in one place.
          </p>

          <p className="mt-10 text-sm text-white/50">
            Secure signup · Student-first · Campus friendly
          </p>
        </div>
      </div>

      {/* RIGHT – SIGN UP CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-gray-50">
        <div
          className="w-full max-w-md bg-white rounded-3xl
                     border border-black/5 shadow-xl p-8
                     animate-fade-up transition-all duration-300"
        >

          {/* HEADER */}
          <div className="text-center">
            <div className="text-xl tracking-tight select-none">
              <span className="font-semibold text-gray-900">Hostel</span>
              <span className="font-light text-gray-600 ml-1">Hungry</span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Create your account to get started
            </p>
          </div>

          {/* FULL NAME */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-xl border border-gray-200
                         px-4 py-3 outline-none transition
                         focus:border-black focus:ring-2 focus:ring-black/10"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="mt-5">
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
          </div>

          {/* MOBILE */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Mobile number
            </label>
            <input
              type="tel"
              className="mt-2 w-full rounded-xl border border-gray-200
                         px-4 py-3 outline-none transition
                         focus:border-black focus:ring-2 focus:ring-black/10"
              placeholder="10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-gray-200
                           px-4 py-3 pr-12 outline-none transition
                           focus:border-black focus:ring-2 focus:ring-black/10"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* ROLE */}
         <div className="mt-6">
  <label className="text-sm font-medium text-gray-700">
    Select role
  </label>

  <div className="mt-2 grid grid-cols-3 gap-2">
    {[
      { value: "user", label: "Student" },
      { value: "owner", label: "Owner" },
      { value: "deliveryBoy", label: "Delivery Partner" },
    ].map((roleItem) => (
      <button
        key={roleItem.value}
        onClick={() => setRole(roleItem.value)} // 👈 LOGIC SAME
        className={`py-2 rounded-xl text-sm font-medium transition
          ${
            role === roleItem.value
              ? "bg-black text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
      >
        {roleItem.label}
      </button>
    ))}
  </div>
</div>


          {/* SIGN UP */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-black
                       text-white py-3 font-medium
                       transition hover:bg-black/90 active:scale-[0.98]"
          >
            {loading ? <ClipLoader size={18} color="white" /> : "Create account"}
          </button>

          {err && (
            <p className="mt-4 text-sm text-red-500 text-center animate-fade-up">
              * {err}
            </p>
          )}

          {success && (
            <p className="mt-4 text-sm text-green-600 text-center animate-fade-up">
              {success}
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
            disabled={loading}
            className="w-full flex items-center justify-center gap-3
                       rounded-full border border-gray-200 py-3
                       transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <FcGoogle size={20} />
            <span className="font-medium text-gray-800">
              Continue with Google
            </span>
          </button>

          {/* SIGN IN */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="font-medium text-black cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



