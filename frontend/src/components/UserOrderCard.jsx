import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { IoReceiptOutline, IoStar, IoStarOutline } from "react-icons/io5";

function UserOrderCard({ data }) {
    const navigate = useNavigate()
    const [selectedRating, setSelectedRating] = useState({}) // itemId: rating

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    const handleRating = async (itemId, rating) => {
        try {
            await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating }, { withCredentials: true })
            setSelectedRating(prev => ({
                ...prev, [itemId]: rating
            }))
        } catch (error) {
            console.error(error)
        }
    }

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-50 text-green-600 border-green-100';
            case 'pending': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-blue-50 text-blue-600 border-blue-100';
        }
    }

    return (
        <div className='bg-white rounded-[32px] border border-gray-100 p-6 space-y-6 transition-all hover:shadow-xl hover:shadow-black/5'>
            {/* HEADER: ORDER META */}
            <div className='flex justify-between items-start'>
                <div className='flex items-center gap-4'>
                    <div className='p-3 bg-[#f5f5f7] rounded-2xl'>
                        <IoReceiptOutline size={22} className="text-black" />
                    </div>
                    <div>
                        <h3 className='font-black uppercase tracking-tighter text-black'>Order #{data._id.slice(-6)}</h3>
                        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>{formatDate(data.createdAt)}</p>
                    </div>
                </div>
                <div className='text-right'>
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border ${getStatusStyles(data.shopOrders?.[0]?.status)}`}>
                        {data.shopOrders?.[0]?.status}
                    </span>
                    <p className='text-[10px] font-black uppercase tracking-widest text-gray-300 mt-2'>
                        {data.paymentMethod === "cod" ? "COD" : "Digital Pay"}
                    </p>
                </div>
            </div>

            {/* SHOP GROUPS */}
            <div className='space-y-4'>
                {data.shopOrders.map((shopOrder, sIdx) => (
                    <div key={sIdx} className='rounded-[24px] bg-[#f5f5f7] p-5 space-y-4'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2'>
                                <span className='w-1.5 h-1.5 bg-black rounded-full'></span>
                                {shopOrder.shop.name}
                            </p>
                        </div>

                        {/* HORIZONTAL ITEM SCROLL */}
                        <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
                            {shopOrder.shopOrderItems.map((item, iIdx) => (
                                <div key={iIdx} className='flex-shrink-0 w-44 bg-white rounded-[20px] p-3 shadow-sm border border-black/5'>
                                    <img src={item.item.image} alt={item.name} className='w-full h-24 object-cover rounded-xl mb-3' />
                                    <h4 className='text-[11px] font-black uppercase tracking-tight text-black truncate'>{item.name}</h4>
                                    <p className='text-[10px] font-bold text-gray-400 mt-1'>QTY: {item.quantity} • ₹{item.price}</p>

                                    {/* RATING SECTION */}
                                    {shopOrder.status === "delivered" && (
                                        <div className='flex items-center gap-1 mt-3 pt-2 border-t border-gray-50'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    key={star}
                                                    onClick={() => handleRating(item.item._id, star)}
                                                    className="transition-transform active:scale-125"
                                                >
                                                    {selectedRating[item.item._id] >= star ? (
                                                        <IoStar size={14} className="text-black" />
                                                    ) : (
                                                        <IoStarOutline size={14} className="text-gray-300 hover:text-black" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* FOOTER: TOTAL & TRACKING */}
            <div className='pt-4 border-t border-dashed border-gray-200 flex items-center justify-between'>
                <div>
                    <span className='text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 block'>Total Amount</span>
                    <span className='text-2xl font-black tracking-tighter text-black'>₹{data.totalAmount}</span>
                </div>
                <button 
                    onClick={() => navigate(`/track-order/${data._id}`)}
                    className='bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10'
                >
                    Track Shipment
                </button>
            </div>
        </div>
    )
}

export default UserOrderCard


// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { serverUrl } from '../App'

// function UserOrderCard({ data }) {
//     const navigate = useNavigate()
//     const [selectedRating, setSelectedRating] = useState({})//itemId:rating

//     const formatDate = (dateString) => {
//         const date = new Date(dateString)
//         return date.toLocaleString('en-GB', {
//             day: "2-digit",
//             month: "short",
//             year: "numeric"
//         })

//     }

//     const handleRating = async (itemId, rating) => {
//         try {
//             const result = await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating }, { withCredentials: true })
//             setSelectedRating(prev => ({
//                 ...prev, [itemId]: rating
//             }))
//         } catch (error) {
//             console.log(error)
//         }
//     }


//     return (
//         <div className='bg-white rounded-lg shadow p-4 space-y-4'>
//             <div className='flex justify-between border-b pb-2'>
//                 <div>
//                     <p className='font-semibold'>
//                         order #{data._id.slice(-6)}
//                     </p>
//                     <p className='text-sm text-gray-500'>
//                         Date: {formatDate(data.createdAt)}
//                     </p>
//                 </div>
//                 <div className='text-right'>
//                     {data.paymentMethod == "cod" ? <p className='text-sm text-gray-500'>{data.paymentMethod?.toUpperCase()}</p> : <p className='text-sm text-gray-500 font-semibold'>Payment: {data.payment ? "true" : "false"}</p>}

//                     <p className='font-medium text-blue-600'>{data.shopOrders?.[0].status}</p>
//                 </div>
//             </div>

//             {data.shopOrders.map((shopOrder, index) => (
//                 <div className='"border rounded-lg p-3 bg-[#fffaf7] space-y-3' key={index}>
//                     <p>{shopOrder.shop.name}</p>

//                     <div className='flex space-x-4 overflow-x-auto pb-2'>
//                         {shopOrder.shopOrderItems.map((item, index) => (
//                             <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white"'>
//                                 <img src={item.item.image} alt="" className='w-full h-24 object-cover rounded' />
//                                 <p className='text-sm font-semibold mt-1'>{item.name}</p>
//                                 <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>

//                                 {shopOrder.status == "delivered" && <div className='flex space-x-1 mt-2'>
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <button className={`text-lg ${selectedRating[item.item._id] >= star ? 'text-yellow-400' : 'text-gray-400'}`} onClick={() => handleRating(item.item._id,star)}>★</button>
//                                     ))}
//                                 </div>}



//                             </div>
//                         ))}
//                     </div>
//                     <div className='flex justify-between items-center border-t pt-2'>
//                         <p className='font-semibold'>Subtotal: {shopOrder.subtotal}</p>
//                         <span className='text-sm font-medium text-blue-600'>{shopOrder.status}</span>
//                     </div>
//                 </div>
//             ))}

//             <div className='flex justify-between items-center border-t pt-2'>
//                 <p className='font-semibold'>Total: ₹{data.totalAmount}</p>
//                 <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm' onClick={() => navigate(`/track-order/${data._id}`)}>Track Order</button>
//             </div>



//         </div>
//     )
// }

// export default UserOrderCard
