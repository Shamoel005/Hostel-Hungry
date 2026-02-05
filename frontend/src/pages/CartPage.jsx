import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuShoppingBag } from "react-icons/lu"; // Sleeker bag icon
import CartItemCard from '../components/CartItemCard';

function CartPage() {
    const navigate = useNavigate()
    const { cartItems, totalAmount } = useSelector(state => state.user)

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white pb-32'>
            {/* --- TOP BAR --- */}
            <div className='max-w-3xl mx-auto px-6 pt-10 flex items-center justify-between'>
                <button 
                    onClick={() => navigate("/")}
                    className="p-3 rounded-full bg-[#f5f5f7] hover:bg-black hover:text-white transition-all shadow-sm"
                >
                    <IoIosArrowRoundBack size={28} />
                </button>
                <div className="text-right">
                    <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Your Selection</span>
                    <h1 className='text-2xl font-black tracking-tighter text-black uppercase'>The Basket.</h1>
                </div>
            </div>

            <main className='max-w-3xl mx-auto px-6 mt-12'>
                {cartItems?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 animate-fade-up'>
                        <div className='bg-[#f5f5f7] p-8 rounded-[40px] mb-6'>
                            <LuShoppingBag size={50} className='text-gray-300' />
                        </div>
                        <h2 className='text-xl font-black uppercase tracking-tighter text-black'>Empty Selection.</h2>
                        <p className='text-gray-400 text-xs font-bold uppercase tracking-widest mt-2'>Add items to start your order</p>
                        <button 
                            onClick={() => navigate("/")}
                            className='mt-8 px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all'
                        >
                            Explore Menu
                        </button>
                    </div>
                ) : (
                    <div className='animate-fade-up'>
                        {/* CART ITEMS LIST */}
                        <div className='space-y-2'>
                            <div className='flex justify-between items-center px-2 mb-4'>
                                <span className='text-[10px] font-black uppercase tracking-widest text-gray-400'>
                                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} Detected
                                </span>
                                <button className='text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline'>
                                    Clear All
                                </button>
                            </div>
                            
                            <div className='space-y-4'>
                                {cartItems?.map((item, index) => (
                                    <CartItemCard data={item} key={index} />
                                ))}
                            </div>
                        </div>

                        {/* --- FLOATING BOTTOM ACTION BAR --- */}
                        <div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-50'>
                            <div className='bg-black text-white rounded-[32px] p-4 pl-8 flex items-center justify-between shadow-2xl shadow-black/30 border border-white/10'>
                                <div>
                                    <span className='text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block'>Grand Total</span>
                                    <span className='text-2xl font-black tracking-tighter'>₹{totalAmount}</span>
                                </div>
                                
                                <button 
                                    onClick={() => navigate("/checkout")}
                                    className='bg-white text-black px-8 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-[0.15em] hover:bg-gray-100 transition-all active:scale-95'
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default CartPage




// import React from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import CartItemCard from '../components/CartItemCard';
// function CartPage() {
//     const navigate = useNavigate()
//     const { cartItems, totalAmount } = useSelector(state => state.user)
//     return (
//         <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
//             <div className='w-full max-w-[800px]'>
//                 <div className='flex items-center gap-[20px] mb-6 '>
//                     <div className=' z-[10] ' onClick={() => navigate("/")}>
//                         <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
//                     </div>
//                     <h1 className='"text-2xl font-bold  text-start'>Your Cart</h1>
//                 </div>
//                 {cartItems?.length == 0 ? (
//                     <p className='text-gray-500 text-lg text-center'>Your Cart is Empty</p>
//                 ) : (<>
//                     <div className='space-y-4'>
//                         {cartItems?.map((item, index) => (
//                             <CartItemCard data={item} key={index} />
//                         ))}
//                     </div>
//                     <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border'>

//                         <h1 className='text-lg font-semibold'>Total Amount</h1>
//                         <span className='text-xl font-bold text-[#ff4d2d]'>₹{totalAmount}</span>
//                     </div>
//                     <div className='mt-4 flex justify-end' > 
//                         <button className='bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#e64526] transition cursor-pointer' onClick={()=>navigate("/checkout")}>Proceed to CheckOut</button>
//                     </div>
//                 </>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default CartPage
