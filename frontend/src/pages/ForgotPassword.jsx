import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
      setErr("")
      setStep(2)
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
      setErr("")
      setStep(3)
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
      setErr("")
      navigate("/signin")
    } catch (error) {
      setErr(error?.response?.data?.message || "Reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-6 selection:bg-black selection:text-white'>
      <div className='w-full max-w-[400px]'>
        
        {/* Back Button & Title */}
        <div className="mb-10 flex flex-col items-start animate-fade-up">
          <button 
            onClick={() => navigate("/signin")}
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-6"
          >
            <IoIosArrowRoundBack size={20} /> Back to Access
          </button>
          <h1 className="text-[40px] font-black tracking-tighter text-black uppercase leading-[0.9]">Recovery.</h1>
          <p className="text-gray-400 font-medium text-sm mt-2">Restore access to your campus account.</p>
        </div>

        {/* --- STEPPER INDICATOR --- */}
        <div className="flex gap-2 mb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= s ? "bg-black" : "bg-gray-100"}`}
            />
          ))}
        </div>

        <div className="space-y-6">
          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <div className="animate-fade-up">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">University Email</label>
                <input 
                  type="email" 
                  className='w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-5 text-sm font-bold text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
                  placeholder='id@university.edu' 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                />
              </div>
              <button 
                className="w-full mt-8 bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center"
                onClick={handleSendOtp} 
                disabled={loading}
              >
                {loading ? <ClipLoader size={18} color='white' /> : "Request OTP Code"}
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <div className="animate-fade-up">
              <div className="group text-center mb-6">
                <p className="text-[12px] font-medium text-gray-400 mb-6 leading-relaxed">Verification code sent to <br/><span className="text-black font-black">{email}</span></p>
                <input 
                  type="text" 
                  maxLength="6"
                  className='w-full text-center text-4xl tracking-[0.3em] rounded-[24px] bg-[#f5f5f7] border-2 border-transparent px-6 py-8 font-black text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-8 focus:ring-black/[0.01]' 
                  placeholder='000000' 
                  onChange={(e) => setOtp(e.target.value)} 
                  value={otp} 
                />
              </div>
              <button 
                className="w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center"
                onClick={handleVerifyOtp} 
                disabled={loading}
              >
                {loading ? <ClipLoader size={18} color='white' /> : "Verify Identity"}
              </button>
              <p onClick={() => setStep(1)} className="text-center mt-8 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black cursor-pointer transition">Change Email</p>
            </div>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <div className="animate-fade-up space-y-5">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">New Access Key</label>
                <input 
                  type="password" 
                  className='w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-5 text-sm font-bold text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
                  placeholder='••••••••' 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  value={newPassword}
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Confirm Access Key</label>
                <input 
                  type="password" 
                  className='w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-5 text-sm font-bold text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
                  placeholder='••••••••' 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  value={confirmPassword} 
                />
              </div>
              <button 
                className="w-full mt-4 bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center"
                onClick={handleResetPassword} 
                disabled={loading}
              >
                {loading ? <ClipLoader size={18} color='white' /> : "Update Access Key"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {err && (
            <div className="mt-8 p-4 rounded-2xl bg-[#fff5f5] border border-red-50 flex items-center justify-center animate-shake">
              <p className='text-red-600 text-[10px] font-black uppercase tracking-widest'>⚠️ {err}</p>
            </div>
          )}
        </div>

        <footer className="mt-20 text-center opacity-30">
          <div className='flex flex-col leading-[0.85] mb-4'>
            <span className='font-black text-xl tracking-tighter text-black uppercase'>Hostel</span>
            <span className='text-[8px] font-bold text-black tracking-[0.4em] uppercase mt-1'>Hungry</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ForgotPassword;

// import axios from 'axios';
// import React, { useState } from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { ClipLoader } from 'react-spinners';

// function ForgotPassword() {
//   const [step, setStep] = useState(1)
//   const [email, setEmail] = useState("")
//   const [otp, setOtp] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [err, setErr] = useState("")
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)

//   // Handlers Logic (Same as yours)
//   const handleSendOtp = async () => {
//     setLoading(true)
//     try {
//       await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
//       setErr("")
//       setStep(2)
//     } catch (error) {
//       setErr(error.response?.data?.message || "Failed to send OTP")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVerifyOtp = async () => {
//     setLoading(true)
//     try {
//       await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
//       setErr("")
//       setStep(3)
//     } catch (error) {
//       setErr(error?.response?.data?.message || "Invalid OTP")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setErr("Passwords do not match")
//       return
//     }
//     setLoading(true)
//     try {
//       await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
//       setErr("")
//       navigate("/signin")
//     } catch (error) {
//       setErr(error?.response?.data?.message || "Reset failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-white p-6 selection:bg-black selection:text-white'>
//       <div className='w-full max-w-[400px] animate-fade-up'>
        
//         {/* Back Button & Title */}
//         <div className="mb-10 flex flex-col items-start">
//           <button 
//             onClick={() => navigate("/signin")}
//             className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-6"
//           >
//             <IoIosArrowRoundBack size={20} /> Back to Access
//           </button>
//           <h1 className="text-[32px] font-black tracking-tight text-black">Recovery.</h1>
//           <p className="text-gray-400 font-medium text-sm mt-1">Restore access to your student account.</p>
//         </div>

//         {/* --- STEPPER INDICATOR --- */}
//         <div className="flex gap-2 mb-10">
//           {[1, 2, 3].map((s) => (
//             <div 
//               key={s} 
//               className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? "bg-black" : "bg-gray-100"}`}
//             />
//           ))}
//         </div>

//         <div className="space-y-6">
//           {/* STEP 1: EMAIL */}
//           {step === 1 && (
//             <div className="animate-fade-up">
//               <div className="group">
//                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">University Email</label>
//                 <input 
//                   type="email" 
//                   className='w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
//                   placeholder='id@university.edu' 
//                   onChange={(e) => setEmail(e.target.value)} 
//                   value={email} 
//                 />
//               </div>
//               <button 
//                 className="w-full mt-8 bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center"
//                 onClick={handleSendOtp} 
//                 disabled={loading}
//               >
//                 {loading ? <ClipLoader size={18} color='white' /> : "Request OTP Code"}
//               </button>
//             </div>
//           )}

//           {/* STEP 2: OTP */}
//           {step === 2 && (
//             <div className="animate-fade-up">
//               <div className="group text-center mb-6">
//                 <p className="text-[12px] font-medium text-gray-400 mb-4">Verification code sent to <br/><span className="text-black font-bold">{email}</span></p>
//                 <input 
//                   type="text" 
//                   maxLength="6"
//                   className='w-full text-center text-2xl tracking-[0.5em] rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-5 font-black text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
//                   placeholder='000000' 
//                   onChange={(e) => setOtp(e.target.value)} 
//                   value={otp} 
//                 />
//               </div>
//               <button 
//                 className="w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center"
//                 onClick={handleVerifyOtp} 
//                 disabled={loading}
//               >
//                 {loading ? <ClipLoader size={18} color='white' /> : "Verify Credentials"}
//               </button>
//               <p onClick={() => setStep(1)} className="text-center mt-6 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black cursor-pointer transition">Change Email</p>
//             </div>
//           )}

//           {/* STEP 3: NEW PASSWORD */}
//           {step === 3 && (
//             <div className="animate-fade-up space-y-4">
//               <div className="group">
//                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">New Password</label>
//                 <input 
//                   type="password" 
//                   className='w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
//                   placeholder='••••••••' 
//                   onChange={(e) => setNewPassword(e.target.value)} 
//                   value={newPassword}
//                 />
//               </div>
//               <div className="group">
//                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Confirm New Password</label>
//                 <input 
//                   type="password" 
//                   className='w-full rounded-[20px] bg-[#f5f5f7] border-2 border-transparent px-6 py-4 text-sm font-semibold text-black outline-none transition-all focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/[0.02]' 
//                   placeholder='••••••••' 
//                   onChange={(e) => setConfirmPassword(e.target.value)} 
//                   value={confirmPassword} 
//                 />
//               </div>
//               <button 
//                 className="w-full mt-4 bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center"
//                 onClick={handleResetPassword} 
//                 disabled={loading}
//               >
//                 {loading ? <ClipLoader size={18} color='white' /> : "Update Access Key"}
//               </button>
//             </div>
//           )}

//           {/* Error Message */}
//           {err && (
//             <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center animate-shake">
//               <p className='text-red-600 text-[11px] font-black uppercase tracking-widest'>⚠️ {err}</p>
//             </div>
//           )}
//         </div>

//         <footer className="mt-12 text-center">
//           <p className="text-[11px] font-medium text-gray-400 tracking-wide">
//             Need help? Contact <span className="text-black font-bold">support@hostelhungry.com</span>
//           </p>
//         </footer>
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword
