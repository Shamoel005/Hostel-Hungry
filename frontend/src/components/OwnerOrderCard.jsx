import axios from 'axios';
import React, { useState } from 'react';
import { MdPhone, MdLocationOn, MdPayment } from "react-icons/md";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';
import { IoMopedOutline, IoCheckmarkCircle } from "react-icons/io5";

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, { status }, { withCredentials: true });
            dispatch(updateOrderStatus({ orderId, shopId, status }));
            setAvailableBoys(result.data.availableBoys);
        } catch (error) {
            console.error("Status update error:", error);
        }
    };

    return (
        <div className='bg-white rounded-[32px] border border-gray-100 p-6 space-y-6 transition-all hover:shadow-xl hover:shadow-black/5 flex flex-col'>
            
            {/* --- CUSTOMER INFO SECTION --- */}
            <div className='flex justify-between items-start'>
                <div className='space-y-1'>
                    <h2 className='text-lg font-black tracking-tighter text-black uppercase leading-tight'>{data.user.fullName}</h2>
                    <div className='flex flex-col gap-1'>
                        <p className='flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                            <MdPhone className="text-black" /> {data.user.mobile}
                        </p>
                        <p className='flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                            <MdPayment className="text-black" /> 
                            {data.paymentMethod === "online" 
                                ? `DIGITAL: ${data.payment ? "VERIFIED" : "PENDING"}` 
                                : "CASH ON DELIVERY"}
                        </p>
                    </div>
                </div>
                <div className='bg-[#f5f5f7] px-4 py-2 rounded-2xl'>
                    <span className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block'>Order ID</span>
                    <span className='text-xs font-black'>#{data._id.slice(-6)}</span>
                </div>
            </div>

            {/* --- DELIVERY ADDRESS --- */}
            <div className='bg-[#f5f5f7] p-4 rounded-2xl space-y-2'>
                <div className='flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400'>
                    <MdLocationOn size={14} className="text-black"/> Drop Location
                </div>
                <p className='text-xs font-bold text-black leading-relaxed'>
                    {data?.deliveryAddress?.text}
                </p>
            </div>

            {/* --- ORDER ITEMS GALLERY --- */}
            <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
                {data.shopOrders.shopOrderItems.map((item, index) => (
                    <div key={index} className='flex-shrink-0 w-36 bg-white border border-gray-100 rounded-[24px] p-2 shadow-sm'>
                        <img src={item.item.image} alt={item.name} className='w-full h-24 object-cover rounded-[18px] mb-2' />
                        <p className='text-[10px] font-black uppercase tracking-tight text-black truncate px-1'>{item.name}</p>
                        <p className='text-[9px] font-bold text-gray-400 px-1'>QTY: {item.quantity} • ₹{item.price}</p>
                    </div>
                ))}
            </div>

            {/* --- STATUS DISPATCH CONTROL --- */}
            <div className='pt-4 border-t border-dashed border-gray-200 mt-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <span className='text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 block'>Current Status</span>
                        <span className='text-[11px] font-black uppercase text-blue-600'>{data.shopOrders.status}</span>
                    </div>
                    
                    <select 
                        className='bg-black text-white rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-gray-800 transition-all'
                        onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
                    >
                        <option value="">Modify Status</option>
                        <option value="pending">Mark Pending</option>
                        <option value="preparing">Start Preparing</option>
                        <option value="out of delivery">Dispatch Order</option>
                    </select>
                </div>

                {/* --- DELIVERY BOY ASSIGNMENT --- */}
                {data.shopOrders.status === "out of delivery" && (
                    <div className="p-4 bg-black rounded-[24px] text-white animate-fade-up">
                        <div className="flex items-center gap-2 mb-3">
                            <IoMopedOutline size={18} className="text-white" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {data.shopOrders.assignedDeliveryBoy ? "Personnel Assigned" : "Dispatch Queue"}
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            {availableBoys?.length > 0 ? (
                                availableBoys.map((b, index) => (
                                    <div key={index} className='flex justify-between items-center bg-white/10 p-3 rounded-xl'>
                                        <span className="text-[11px] font-bold tracking-tight">{b.fullName}</span>
                                        <span className="text-[10px] font-black text-gray-400">{b.mobile}</span>
                                    </div>
                                ))
                            ) : data.shopOrders.assignedDeliveryBoy ? (
                                <div className='flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/20'>
                                    <span className="text-[11px] font-bold tracking-tight">{data.shopOrders.assignedDeliveryBoy.fullName}</span>
                                    <IoCheckmarkCircle className="text-green-400" />
                                </div>
                            ) : (
                                <p className='text-[10px] font-bold text-gray-500 animate-pulse'>Broadcasting to nearby riders...</p>
                            )}
                        </div>
                    </div>
                )}

                <div className='flex justify-between items-end mt-4'>
                    <span className='text-[9px] font-black uppercase tracking-[0.2em] text-gray-400'>Order Payout</span>
                    <span className='text-xl font-black tracking-tighter text-black'>₹{data.shopOrders.subtotal}</span>
                </div>
            </div>
        </div>
    );
}

export default OwnerOrderCard;


// import axios from 'axios';
// import React from 'react'
// import { MdPhone } from "react-icons/md";
// import { serverUrl } from '../App';
// import { useDispatch } from 'react-redux';
// import { updateOrderStatus } from '../redux/userSlice';
// import { useState } from 'react';
// import { useEffect } from 'react';
// function OwnerOrderCard({ data }) {
//     const [availableBoys,setAvailableBoys]=useState([])
// const dispatch=useDispatch()
//     const handleUpdateStatus=async (orderId,shopId,status) => {
//         try {
//             const result=await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`,{status},{withCredentials:true})
//              dispatch(updateOrderStatus({orderId,shopId,status}))
//              setAvailableBoys(result.data.availableBoys)
//              console.log(result.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }


  
//     return (
//         <div className='bg-white rounded-lg shadow p-4 space-y-4'>
//             <div>
//                 <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullName}</h2>
//                 <p className='text-sm text-gray-500'>{data.user.email}</p>
//                 <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'><MdPhone /><span>{data.user.mobile}</span></p>
//                 {data.paymentMethod=="online"?<p className='gap-2 text-sm text-gray-600'>payment: {data.payment?"true":"false"}</p>:<p className='gap-2 text-sm text-gray-600'>Payment Method: {data.paymentMethod}</p>}
                
//             </div>

//             <div className='flex items-start flex-col gap-2 text-gray-600 text-sm'>
//                 <p>{data?.deliveryAddress?.text}</p>
//                 <p className='text-xs text-gray-500'>Lat: {data?.deliveryAddress.latitude} , Lon {data?.deliveryAddress.longitude}</p>
//             </div>

//             <div className='flex space-x-4 overflow-x-auto pb-2'>
//                 {data.shopOrders.shopOrderItems.map((item, index) => (
//                     <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white"'>
//                         <img src={item.item.image} alt="" className='w-full h-24 object-cover rounded' />
//                         <p className='text-sm font-semibold mt-1'>{item.name}</p>
//                         <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>
//                     </div>
//                 ))}
//             </div>

// <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
// <span className='text-sm'>status: <span className='font-semibold capitalize text-[#ff4d2d]'>{data.shopOrders.status}</span>
// </span>

// <select  className='rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d]' onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)}>
//     <option value="">Change</option>
// <option value="pending">Pending</option>
// <option value="preparing">Preparing</option>
// <option value="out of delivery">Out Of Delivery</option>
// </select>

// </div>

// {data.shopOrders.status=="out of delivery" && 
// <div className="mt-3 p-2 border rounded-lg text-sm bg-orange-50 gap-4">
//     {data.shopOrders.assignedDeliveryBoy?<p>Assigned Delivery Boy:</p>:<p>Available Delivery Boys:</p>}
//    {availableBoys?.length>0?(
//      availableBoys.map((b,index)=>(
//         <div className='text-gray-800'>{b.fullName}-{b.mobile}</div>
//      ))
//    ):data.shopOrders.assignedDeliveryBoy?<div>{data.shopOrders.assignedDeliveryBoy.fullName}-{data.shopOrders.assignedDeliveryBoy.mobile}</div>:<div>Waiting for delivery boy to accept</div>}
// </div>}

// <div className='text-right font-bold text-gray-800 text-sm'>
//  Total: ₹{data.shopOrders.subtotal}
// </div>
//         </div>
//     )
// }

// export default OwnerOrderCard
