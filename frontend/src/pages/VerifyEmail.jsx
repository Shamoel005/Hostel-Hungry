
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const res = await axios.get(
          `${serverUrl}/api/auth/verify-email?token=${token}`,
          { withCredentials: true }
        );

        setStatus("success");
        setMessage(res.data?.message || "Email verified successfully");

        // Redirect to signin after 3 seconds
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Verification failed or link expired"
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 selection:bg-black selection:text-white">
      <div className="w-full max-w-[440px] text-center animate-fade-up">
        
        {/* --- BRANDING (Consistent with other pages) --- */}
        <div className="flex flex-col leading-[0.85] mb-16 opacity-30">
            <span className="font-black text-2xl tracking-tighter text-black uppercase">Hostel</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase ml-1 mt-1">Hungry</span>
        </div>

        {/* --- VERIFYING STATE --- */}
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-[3px] border-gray-100 border-t-black animate-spin mb-8"></div>
            <h1 className="text-[32px] font-black tracking-tight text-black mb-2">Authenticating.</h1>
            <p className="text-gray-400 font-medium text-sm tracking-wide">Securing your university account...</p>
          </div>
        )}

        {/* --- SUCCESS STATE --- */}
        {status === "success" && (
          <div className="animate-fade-up">
            <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-black/5 rounded-full scale-150 blur-3xl"></div>
                <FaCheckCircle className="text-black relative z-10" size={70} />
            </div>
            <h1 className="text-[32px] font-black tracking-tight text-black mb-3">Verified.</h1>
            <p className="text-gray-400 font-medium text-sm mb-12">{message}</p>
            
            <div className="bg-[#f5f5f7] rounded-full p-6 inline-flex items-center gap-4 border border-black/[0.03]">
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Redirecting to Login</p>
            </div>
          </div>
        )}

        {/* --- ERROR STATE --- */}
        {status === "error" && (
          <div className="animate-fade-up">
            <div className="relative inline-block mb-10">
                <FaExclamationCircle className="text-red-500 relative z-10" size={70} />
            </div>
            <h1 className="text-[32px] font-black tracking-tight text-black mb-3">Failed.</h1>
            <p className="text-gray-400 font-medium text-sm mb-10">{message}</p>
            
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-gray-800 active:scale-[0.95] shadow-2xl shadow-black/10"
            >
              Re-register Account
            </button>
          </div>
        )}

        {/* Footer info */}
        <footer className="mt-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Identity Protection System</p>
        </footer>
      </div>
    </div>
  );
}

export default VerifyEmail;
