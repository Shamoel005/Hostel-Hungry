import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStore, FaPhoneAlt, FaUserTie } from "react-icons/fa"; 
import { FaLocationDot, FaUtensils, FaArrowLeft } from "react-icons/fa6";
import FoodCard from '../components/FoodCard';

function Shop() {
    const { shopId } = useParams()
    const [items, setItems] = useState([])
    const [shop, setShop] = useState(null)
    const navigate = useNavigate()

    const handleShop = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`, { withCredentials: true })
            setShop(result.data.shop)
            setItems(result.data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleShop()
    }, [shopId])

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white'>
            {/* --- TOP NAV --- */}
            <button 
                className='fixed top-6 left-6 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md text-black p-3 rounded-full shadow-xl shadow-black/5 hover:bg-black hover:text-white transition-all duration-300 active:scale-90 border border-gray-100' 
                onClick={() => navigate("/")}
            >
                <FaArrowLeft size={20} />
            </button>

            {shop && (
                <>
                    {/* --- HERO SECTION --- */}
                    <div className='relative w-full h-[50vh] overflow-hidden'>
                        <img src={shop.image} alt="" className='w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-100' />
                        <div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-8 lg:p-16'>
                            <div className="animate-fade-up">
                                <span className='inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black mb-4'>
                                    <FaStore size={10}/> Verified Shop
                                </span>
                                <h1 className='text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-4'>
                                    {shop.name}.
                                </h1>
                                <div className='flex items-center gap-2 text-gray-200'>
                                    <FaLocationDot size={14} className='text-white' />
                                    <p className='text-sm font-bold uppercase tracking-widest'>{shop.address}, {shop.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MERCHANT INFO CARD --- */}
                    <div className='max-w-7xl mx-auto px-6 -mt-10 relative z-10'>
                        <div className='bg-[#fbfbfd] p-6 lg:p-8 rounded-[32px] border border-gray-100 shadow-2xl shadow-black/[0.03] flex flex-wrap gap-10 items-center'>
                            
                            <div className='flex items-center gap-5'>
                                <div className='bg-black h-14 w-14 rounded-2xl flex items-center justify-center text-white'>
                                    <FaUserTie size={24} />
                                </div>
                                <div>
                                    <label className='block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1'>Partner Merchant</label>
                                    <p className='text-xl font-black text-black tracking-tight'>
                                        {shop.owner?.fullName || "Verified Merchant"}
                                    </p>
                                </div>
                            </div>

                            {shop.owner?.mobile && (
                                <div className='flex items-center gap-5 border-l border-gray-100 pl-10'>
                                    <div className='bg-[#f5f5f7] h-14 w-14 rounded-2xl flex items-center justify-center text-black'>
                                        <FaPhoneAlt size={20} />
                                    </div>
                                    <div>
                                        <label className='block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1'>Direct Contact</label>
                                        <p className='text-xl font-black text-black tracking-tight'>{shop.owner.mobile}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* --- MENU SECTION --- */}
            <div className='max-w-7xl mx-auto px-6 py-20'>
                <div className='flex flex-col items-center mb-16'>
                    <div className="h-1 w-10 bg-black mb-6"></div>
                    <h2 className='text-4xl font-black text-black uppercase tracking-tighter flex items-center gap-4'>
                        Signature Menu.
                    </h2>
                    <p className='text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2'>Handpicked for you</p>
                </div>

                {items.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                        {items.map((item) => (
                            <div key={item._id} className="animate-fade-up">
                                <FoodCard data={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-20 opacity-20">
                         <FaUtensils size={40} className="mb-4" />
                         <p className='text-center font-black uppercase tracking-widest text-sm'>Kitchen is currently quiet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shop;


