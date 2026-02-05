import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from '../components/DeliveryBoyTracking'
import { useSelector } from 'react-redux'

function TrackOrderPage() {
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState() 
    const navigate = useNavigate()
    const { socket } = useSelector(state => state.user)
    const [liveLocations, setLiveLocations] = useState({})

    const handleGetOrder = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
            setCurrentOrder(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('updateDeliveryLocation', ({ deliveryBoyId, latitude, longitude }) => {
                setLiveLocations(prev => ({
                    ...prev,
                    [deliveryBoyId]: { lat: latitude, lon: longitude }
                }))
            })
        }
    }, [socket])

    useEffect(() => {
        handleGetOrder()
    }, [orderId])

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white pb-20'>
            <div className='max-w-4xl mx-auto px-6 pt-10 flex flex-col gap-8 animate-fade-up'>
                
                {/* --- HEADER SECTION --- */}
                <div className='flex items-center gap-6'>
                    <button 
                        onClick={() => navigate("/")}
                        className="p-3 rounded-full bg-[#f5f5f7] hover:bg-black hover:text-white transition-all duration-300"
                    >
                        <IoIosArrowRoundBack size={28} />
                    </button>
                    <div>
                        <h1 className='text-3xl font-black tracking-tighter text-black uppercase'>Track Order.</h1>
                        <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>ID: #{orderId?.slice(-8)}</p>
                    </div>
                </div>

                {currentOrder?.shopOrders?.map((shopOrder, index) => (
                    <div className='bg-[#fbfbfd] p-8 rounded-[32px] border border-gray-100 space-y-8 transition-all hover:shadow-xl hover:shadow-black/[0.02]' key={index}>
                        
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Vendor</label>
                                    <p className='text-2xl font-black tracking-tight text-black'>{shopOrder.shop.name}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Items</label>
                                    <p className='text-sm font-semibold text-gray-600'>
                                        {shopOrder.shopOrderItems?.map(i => i.name).join(", ")}
                                    </p>
                                </div>
                            </div>

                            <div className="md:text-right space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Total Bill</label>
                                    <p className='text-xl font-black text-black'>₹{shopOrder.subtotal}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Delivery To</label>
                                    <p className='text-[12px] font-bold text-gray-500 max-w-[200px] leading-relaxed'>{currentOrder.deliveryAddress?.text}</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* --- STATUS & DELIVERY INFO --- */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {shopOrder.status !== "delivered" ? (
                                <>
                                    {shopOrder.assignedDeliveryBoy ? (
                                        <div className='flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 w-full md:w-auto'>
                                            <div className="h-10 w-10 bg-[#f5f5f7] rounded-full flex items-center justify-center font-black text-black">
                                                {shopOrder.assignedDeliveryBoy.fullName[0]}
                                            </div>
                                            <div>
                                                <p className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Rider assigned</p>
                                                <p className='text-sm font-black text-black'>{shopOrder.assignedDeliveryBoy.fullName}</p>
                                                <p className='text-xs font-bold text-gray-400'>{shopOrder.assignedDeliveryBoy.mobile}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse" />
                                            <p className='text-[10px] font-black uppercase tracking-widest text-amber-600'>Finding a nearby rider...</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-green-50 px-6 py-2 rounded-full">
                                    <p className='text-green-600 font-black text-[11px] uppercase tracking-[0.2em]'>✅ Order Delivered</p>
                                </div>
                            )}
                        </div>

                        {/* --- MAP CONTAINER --- */}
                        {(shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered") && (
                            <div className="relative group">
                                <div className="absolute -top-3 left-6 z-20 bg-black text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    Live Tracking
                                </div>
                                <div className="h-[400px] w-full rounded-[24px] overflow-hidden border-4 border-[#f5f5f7] shadow-inner">
                                    <DeliveryBoyTracking data={{
                                        deliveryBoyLocation: liveLocations[shopOrder.assignedDeliveryBoy._id] || {
                                            lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                                            lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
                                        },
                                        customerLocation: {
                                            lat: currentOrder.deliveryAddress.latitude,
                                            lon: currentOrder.deliveryAddress.longitude
                                        }
                                    }} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrackOrderPage

// import axios from 'axios'
// import React from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { serverUrl } from '../App'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import DeliveryBoyTracking from '../components/DeliveryBoyTracking'
// import { useSelector } from 'react-redux'
// function TrackOrderPage() {
//     const { orderId } = useParams()
//     const [currentOrder, setCurrentOrder] = useState() 
//     const navigate = useNavigate()
//     const {socket}=useSelector(state=>state.user)
//     const [liveLocations,setLiveLocations]=useState({})
//     const handleGetOrder = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
//             setCurrentOrder(result.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
// socket.on('updateDeliveryLocation',({deliveryBoyId,latitude,longitude})=>{
// setLiveLocations(prev=>({
//   ...prev,
//   [deliveryBoyId]:{lat:latitude,lon:longitude}
// }))
// })
//     },[socket])

//     useEffect(() => {
//         handleGetOrder()
//     }, [orderId])
//     return (
//         <div className='max-w-4xl mx-auto p-4 flex flex-col gap-6'>
//             <div className='relative flex items-center gap-4 top-[20px] left-[20px] z-[10] mb-[10px]' onClick={() => navigate("/")}>
//                 <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
//                 <h1 className='text-2xl font-bold md:text-center'>Track Order</h1>
//             </div>
//       {currentOrder?.shopOrders?.map((shopOrder,index)=>(
//         <div className='bg-white p-4 rounded-2xl shadow-md border border-orange-100 space-y-4' key={index}>
//          <div>
//             <p className='text-lg font-bold mb-2 text-[#ff4d2d]'>{shopOrder.shop.name}</p>
//             <p className='font-semibold'><span>Items:</span> {shopOrder.shopOrderItems?.map(i=>i.name).join(",")}</p>
//             <p><span className='font-semibold'>Subtotal:</span> {shopOrder.subtotal}</p>
//             <p className='mt-6'><span className='font-semibold'>Delivery address:</span> {currentOrder.deliveryAddress?.text}</p>
//          </div>
//          {shopOrder.status!="delivered"?<>
// {shopOrder.assignedDeliveryBoy?
// <div className='text-sm text-gray-700'>
// <p className='font-semibold'><span>Delivery Boy Name:</span> {shopOrder.assignedDeliveryBoy.fullName}</p>
// <p className='font-semibold'><span>Delivery Boy contact No.:</span> {shopOrder.assignedDeliveryBoy.mobile}</p>
// </div>:<p className='font-semibold'>Delivery Boy is not assigned yet.</p>}
//          </>:<p className='text-green-600 font-semibold text-lg'>Delivered</p>}

// {(shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered") && (
//   <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
//     <DeliveryBoyTracking data={{
//       deliveryBoyLocation:liveLocations[shopOrder.assignedDeliveryBoy._id] || {
//         lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
//         lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
//       },
//       customerLocation: {
//         lat: currentOrder.deliveryAddress.latitude,
//         lon: currentOrder.deliveryAddress.longitude
//       }
//     }} />
//   </div>
// )}



//         </div>
//       ))}



//         </div>
//     )
// }

// export default TrackOrderPage
