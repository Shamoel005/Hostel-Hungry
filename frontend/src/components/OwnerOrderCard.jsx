import axios from 'axios';
import React, { useState } from 'react';
import { MdPhone } from "react-icons/md";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        if (!status) return; // Prevent empty status updates
        try {
            const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, { status }, { withCredentials: true });
            dispatch(updateOrderStatus({ orderId, shopId, status }));
            
            // Set available boys if the backend returns them
            if (result.data && result.data.availableBoys) {
                setAvailableBoys(result.data.availableBoys);
            }
        } catch (error) {
            console.error("Status update error:", error);
        }
    };

    return (
        <div className='bg-white rounded-[24px] border border-gray-100 p-5 space-y-5 shadow-sm hover:shadow-md transition-shadow'>
            
            {/* --- CUSTOMER HEADER --- */}
            <div className='flex justify-between items-start'>
                <div className='space-y-1'>
                    <h2 className='text-lg font-bold text-gray-900 leading-tight'>{data.user.fullName}</h2>
                    <p className='text-xs text-gray-400 font-medium truncate max-w-[200px]'>{data.user.email}</p>
                    <div className='flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-tight pt-1'>
                        <MdPhone className="text-gray-900" size={14} /> 
                        <span>{data.user.mobile}</span>
                    </div>
                </div>
                <div className='text-right'>
                    <div className='bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100'>
                        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>ID: {data._id.slice(-6)}</p>
                    </div>
                    <p className='text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-tighter'>
                        {data.paymentMethod === "online" ? `Paid: ${data.payment}` : "Cash on Delivery"}
                    </p>
                </div>
            </div>

            {/* --- ADDRESS --- */}
            <div className='bg-[#fcfcfd] p-4 rounded-2xl border border-gray-50'>
                <p className='text-xs font-semibold text-gray-700 leading-relaxed'>
                    {data?.deliveryAddress?.text}
                </p>
            </div>

            {/* --- ITEMS LIST --- */}
            <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
                {data.shopOrders.shopOrderItems.map((item, index) => (
                    <div key={index} className='flex-shrink-0 w-36 bg-white border border-gray-100 rounded-2xl p-2'>
                        <img src={item.item.image} alt={item.name} className='w-full h-20 object-cover rounded-xl mb-2' />
                        <p className='text-[11px] font-bold text-gray-900 truncate'>{item.name}</p>
                        <p className='text-[10px] text-gray-400 font-bold'>QTY: {item.quantity} • ₹{item.price}</p>
                    </div>
                ))}
            </div>

            {/* --- STATUS & ACTIONS --- */}
            <div className='pt-4 border-t border-gray-100'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-1'>
                        <span className='text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]'>Status</span>
                        <p className='text-xs font-black uppercase text-orange-600'>{data.shopOrders.status}</p>
                    </div>
                    
                    <select 
                        className='bg-black text-white rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer hover:bg-gray-800 transition-colors'
                        onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
                        value={data.shopOrders.status}
                    >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="out of delivery">Dispatch</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>

                {/* --- DELIVERY ASSIGNMENT --- */}
                {data.shopOrders.status === "out of delivery" && (
                    <div className="mt-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 animate-in fade-in duration-500">
                        <p className='text-[10px] font-black uppercase tracking-widest text-orange-700 mb-2'>
                            {data.shopOrders.assignedDeliveryBoy ? "Assigned Rider" : "Nearby Available Riders"}
                        </p>
                        <div className="space-y-2">
                            {availableBoys?.length > 0 ? (
                                availableBoys.map((b, index) => (
                                    <div key={index} className='text-[11px] font-bold text-gray-800 bg-white p-2 rounded-lg border border-orange-100'>
                                        {b.fullName} — {b.mobile}
                                    </div>
                                ))
                            ) : data.shopOrders.assignedDeliveryBoy ? (
                                <div className='text-[11px] font-bold text-gray-800 bg-white p-2 rounded-lg'>
                                    {data.shopOrders.assignedDeliveryBoy.fullName} — {data.shopOrders.assignedDeliveryBoy.mobile}
                                </div>
                            ) : (
                                <p className='text-[11px] font-medium text-gray-500 italic'>Broadcasting to riders...</p>
                            )}
                        </div>
                    </div>
                )}

                <div className='flex justify-between items-end mt-4'>
                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Net Payout</span>
                    <span className='text-lg font-black text-gray-900'>₹{data.shopOrders.subtotal}</span>
                </div>
            </div>
        </div>
    );
}

export default OwnerOrderCard;

