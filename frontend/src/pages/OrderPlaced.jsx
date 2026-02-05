import React from 'react'
import { FaCheck } from "react-icons/fa6"; // Switched to a sleeker check
import { useNavigate } from 'react-router-dom';

function OrderPlaced() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-white flex flex-col justify-center items-center px-6 text-center selection:bg-black selection:text-white'>
            
            {/* --- SUCCESS ANIMATION ICON --- */}
            <div className='relative mb-10'>
                <div className='absolute inset-0 bg-[#f5f5f7] rounded-full scale-[1.8] animate-pulse' />
                <div className='relative z-10 h-24 w-24 bg-black rounded-full flex items-center justify-center text-white shadow-2xl shadow-black/20'>
                    <FaCheck size={40} />
                </div>
            </div>

            {/* --- CONTENT --- */}
            <div className='animate-fade-up max-w-sm'>
                <h1 className='text-[42px] font-black tracking-tighter text-black uppercase leading-none mb-4'>
                    Success.
                </h1>
                
                <p className='text-gray-400 font-medium text-sm leading-relaxed mb-12'>
                    Your order has been received and is being prepared by our verified university vendors. 
                    Stay hungry, we're on the way.
                </p>

                {/* --- ACTION BUTTONS --- */}
                <div className='space-y-4'>
                    <button 
                        onClick={() => navigate("/my-orders")}
                        className='w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-gray-800 active:scale-[0.98] shadow-2xl shadow-black/10'
                    >
                        Track My Order
                    </button>

                    <button 
                        onClick={() => navigate("/")}
                        className='w-full bg-transparent text-gray-400 py-4 rounded-[22px] font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:text-black hover:bg-gray-50'
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            {/* --- BRAND FOOTER --- */}
            <div className='absolute bottom-12'>
                <div className='flex flex-col items-center leading-[0.85] opacity-20'>
                    <span className='font-black text-xl tracking-tighter text-black uppercase'>Hostel</span>
                    <span className='text-[8px] font-bold text-black tracking-[0.4em] uppercase mt-1'>Hungry</span>
                </div>
            </div>
        </div>
    )
}

export default OrderPlaced;


// import React from 'react'
// import { FaCircleCheck } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// function OrderPlaced() {
//     const navigate=useNavigate()
//   return (
//     <div className='min-h-screen bg-[#fff9f6] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden'>
//       <FaCircleCheck className='text-green-500 text-6xl mb-4'/>
//       <h1 className='text-3xl font-bold text-gray-800 mb-2'>Order Placed!
//       </h1>
//       <p className='text-gray-600 max-w-md mb-6'>Thank you for your purchase. Your order is being prepared.  
//         You can track your order status in the "My Orders" section.
//      </p>
//      <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-6 py-3 rounded-lg text-lg font-medium transition' onClick={()=>navigate("/my-orders")}>Back to my orders</button>
//     </div>
//   )
// }

// export default OrderPlaced

