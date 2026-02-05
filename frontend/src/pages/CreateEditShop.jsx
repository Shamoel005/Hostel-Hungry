import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaStore } from "react-icons/fa6"; // Switched to Store icon for better context
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

function CreateEditShop() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)

    const [name, setName] = useState(myShopData?.name || "")
    const [address, setAddress] = useState(myShopData?.address || currentAddress)
    const [city, setCity] = useState(myShopData?.city || currentCity)
    const [state, setState] = useState(myShopData?.state || currentState)
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
    const [backendImage, setBackendImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setBackendImage(file)
            setFrontendImage(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("city", city)
            formData.append("state", state)
            formData.append("address", address)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/shop/create-edit`, formData, { withCredentials: true })
            dispatch(setMyShopData(result.data))
            navigate("/")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white pb-20'>
            {/* --- NAVIGATION BAR --- */}
            <div className='max-w-4xl mx-auto px-6 pt-10 flex items-center justify-between'>
                <button 
                    onClick={() => navigate("/")}
                    className="p-3 rounded-full bg-[#f5f5f7] hover:bg-black hover:text-white transition-all shadow-sm"
                >
                    <IoIosArrowRoundBack size={28} />
                </button>
                <div className="text-right">
                    <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Merchant Profile</span>
                    <h1 className='text-2xl font-black tracking-tighter text-black uppercase'>
                        {myShopData ? "Modify Outlet." : "Register Shop."}
                    </h1>
                </div>
            </div>

            <main className='max-w-xl mx-auto px-6 mt-12'>
                <form onSubmit={handleSubmit} className='space-y-10 animate-fade-up'>
                    
                    {/* BRANDING / IMAGE SECTION */}
                    <div className='group relative'>
                        <div className='w-full h-64 bg-[#f5f5f7] rounded-[40px] overflow-hidden border-2 border-dashed border-gray-100 group-hover:border-black transition-all relative'>
                            {frontendImage ? (
                                <img src={frontendImage} alt="Shop Preview" className='w-full h-full object-cover' />
                            ) : (
                                <div className='flex flex-col items-center justify-center h-full text-gray-300'>
                                    <FaStore size={40} className="mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Storefront Image</span>
                                </div>
                            )}
                            <input 
                                type="file" 
                                accept='image/*' 
                                className='absolute inset-0 opacity-0 cursor-pointer' 
                                onChange={handleImage} 
                            />
                        </div>
                        <label className='absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl'>
                            Upload Logo / Facade
                        </label>
                    </div>

                    {/* SHOP DETAILS SECTION */}
                    <div className='space-y-6 pt-6'>
                        <div className="space-y-2">
                            <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Shop Entity Name</label>
                            <input 
                                type="text" 
                                placeholder='Ex: Royal Cafe NITP' 
                                className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Location (City)</label>
                                <input 
                                    type="text" 
                                    className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Region (State)</label>
                                <input 
                                    type="text" 
                                    className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Street Address</label>
                            <input 
                                type="text" 
                                placeholder='Nearby Hostel / Landmark' 
                                className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>

                        <button 
                            type="submit"
                            className='w-full mt-4 bg-black text-white py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center'
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={18} color='white' /> : "Confirm Business Details"}
                        </button>
                    </div>
                </form>
            </main>

            {/* Subtle Footer Branding */}
            <div className='mt-20 flex flex-col items-center opacity-10 pointer-events-none'>
                <span className='font-black text-3xl tracking-tighter text-black uppercase'>Hostel</span>
                <span className='text-[8px] font-bold text-black tracking-[0.5em] uppercase'>Partner Console</span>
            </div>
        </div>
    )
}

export default CreateEditShop

// import React from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { FaUtensils } from "react-icons/fa";
// import { useState } from 'react';
// import { useRef } from 'react';
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { setMyShopData } from '../redux/ownerSlice';
// import { ClipLoader } from 'react-spinners';
// function CreateEditShop() {
//     const navigate = useNavigate()
//     const { myShopData } = useSelector(state => state.owner)
//     const { currentCity,currentState,currentAddress } = useSelector(state => state.user)
//     const [name,setName]=useState(myShopData?.name || "")
//      const [address,setAddress]=useState(myShopData?.address || currentAddress)
//      const [city,setCity]=useState(myShopData?.city || currentCity)
//        const [state,setState]=useState(myShopData?.state || currentState)
//        const [frontendImage,setFrontendImage]=useState(myShopData?.image || null)
//        const [backendImage,setBackendImage]=useState(null)
//        const [loading,setLoading]=useState(false)
//        const dispatch=useDispatch()
//        const handleImage=(e)=>{
//         const file=e.target.files[0]
//         setBackendImage(file)
//         setFrontendImage(URL.createObjectURL(file))
//        }

//        const handleSubmit=async (e)=>{
//         e.preventDefault()
//         setLoading(true)
//         try {
//            const formData=new FormData()
//            formData.append("name",name) 
//            formData.append("city",city) 
//            formData.append("state",state) 
//            formData.append("address",address) 
//            if(backendImage){
//             formData.append("image",backendImage)
//            }
//            const result=await axios.post(`${serverUrl}/api/shop/create-edit`,formData,{withCredentials:true})
//            dispatch(setMyShopData(result.data))
//           setLoading(false)
//           navigate("/")
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//        }
//     return (
//         <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen'>
//             <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px]' onClick={() => navigate("/")}>
//                 <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
//             </div>

//             <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
//                 <div className='flex flex-col items-center mb-6'>
//                     <div className='bg-orange-100 p-4 rounded-full mb-4'>
//                         <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
//                     </div>
//                     <div className="text-3xl font-extrabold text-gray-900">
//                         {myShopData ? "Edit Shop" : "Add Shop"}
//                     </div>
//                 </div>
//                 <form className='space-y-5' onSubmit={handleSubmit}>
//                     <div>
//                         <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
//                         <input type="text" placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
//                         onChange={(e)=>setName(e.target.value)}
//                         value={name}
//                         />
//                     </div>
//                     <div>
//                         <label className='block text-sm font-medium text-gray-700 mb-1'>shop Image</label>
//                         <input type="file" accept='image/*' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={handleImage}  />
//                         {frontendImage &&   <div className='mt-4'>
//                             <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border'/>
//                         </div>}
                      
//                     </div>
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                         <div>
//                            <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
//                         <input type="text" placeholder='City' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e)=>setCity(e.target.value)}
//                         value={city}/> 
//                         </div>
//                         <div>
//                             <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
//                         <input type="text" placeholder='State' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e)=>setState(e.target.value)}
//                         value={state}/> 
//                         </div>
//                     </div>
//                     <div>
//                         <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
//                         <input type="text" placeholder='Enter Shop Address' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e)=>setAddress(e.target.value)}
//                         value={address}/> 
//                     </div>
//                     <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer' disabled={loading}>
//                         {loading?<ClipLoader size={20} color='white'/>:"Save"}
                    
//                     </button>
//                 </form>
//             </div>
                
                

//         </div>
//     )
// }

// export default CreateEditShop
