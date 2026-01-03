import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <h2 className="text-2xl font-bold mb-3">Verifying Email...</h2>
            <p className="text-gray-600">Please wait a moment</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Email Verified 🎉
            </h2>
            <p className="text-gray-700">{message}</p>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting to Sign In...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Verification Failed ❌
            </h2>
            <p className="text-gray-700">{message}</p>
            <button
              onClick={() => navigate("/signup")}
              className="mt-5 px-4 py-2 bg-[#ff4d2d] text-white rounded-lg"
            >
              Go to Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
