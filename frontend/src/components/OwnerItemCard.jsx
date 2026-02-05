import axios from 'axios';
import React from 'react';
import { LuPencilLine, LuTrash2 } from "react-icons/lu"; // More modern, thinner icons
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({ data }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to remove this item?")) return;
        try {
            const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}`, { withCredentials: true })
            dispatch(setMyShopData(result.data))
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    return (
        <div className='flex bg-white rounded-[28px] overflow-hidden border border-gray-100 hover:border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 w-full max-w-2xl group'>
            {/* --- PRODUCT IMAGE --- */}
            <div className='w-32 sm:w-44 flex-shrink-0 relative overflow-hidden'>
                <img 
                    src={data.image} 
                    alt={data.name} 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute top-3 left-3'>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full backdrop-blur-md ${data.foodType === 'veg' ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                        {data.foodType}
                    </span>
                </div>
            </div>

            {/* --- DETAILS --- */}
            <div className='flex flex-col justify-between p-5 flex-1'>
                <div className='space-y-1'>
                    <div className='flex justify-between items-start'>
                        <h2 className='text-lg font-black tracking-tighter text-black uppercase leading-tight'>
                            {data.name}
                        </h2>
                        <span className='text-[10px] font-black tracking-tighter text-black'>
                            ₹{data.price}
                        </span>
                    </div>
                    <p className='text-[9px] font-black uppercase tracking-[0.2em] text-gray-400'>
                        {data.category}
                    </p>
                </div>

                <div className='flex items-center justify-between mt-4 pt-3 border-t border-gray-50'>
                    <div className='flex items-center gap-1'>
                        {/* Status Indicator for Stock - Optional addition */}
                        <div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse'></div>
                        <span className='text-[8px] font-black uppercase tracking-widest text-gray-400'>In Stock</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <button 
                            onClick={() => navigate(`/edit-item/${data._id}`)}
                            className='p-2.5 bg-[#f5f5f7] hover:bg-black hover:text-white rounded-xl transition-all active:scale-90'
                        >
                            <LuPencilLine size={16} />
                        </button>
                        <button 
                            onClick={handleDelete}
                            className='p-2.5 bg-[#f5f5f7] hover:bg-red-50 text-red-400 hover:text-red-600 rounded-xl transition-all active:scale-90'
                        >
                            <LuTrash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerItemCard


// import axios from 'axios';
// import React from 'react'
// import { FaPen } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { useDispatch } from 'react-redux';
// import { setMyShopData } from '../redux/ownerSlice';
// function OwnerItemCard({data}) {
//     const navigate=useNavigate()
//     const dispatch=useDispatch()
//     const handleDelete=async () => {
//       try {
//         const result=await axios.get(`${serverUrl}/api/item/delete/${data._id}`,{withCredentials:true})
//         dispatch(setMyShopData(result.data))
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   return (
//     <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
//       <div className='w-36  flex-shrink-0 bg-gray-50'>
//         <img src={data.image} alt="" className='w-full h-full object-cover'/>
//       </div>
//       <div className='flex flex-col justify-between p-3 flex-1'>
//           <div>
// <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
// <p><span className='font-medium text-gray-70'>Category:</span> {data.category}</p>
// <p><span className='font-medium text-gray-70'>Food Type:</span> {data.foodType}</p>
//           </div>
//           <div className='flex items-center justify-between'>
//             <div className='text-[#ff4d2d] font-bold'>{data.price}</div>
//           <div className='flex items-center gap-2'>
// <div className='p-2 cursor-pointer rounded-full hover:bg-[#ff4d2d]/10  text-[#ff4d2d]' onClick={()=>navigate(`/edit-item/${data._id}`)}>
// <FaPen size={16}/>
// </div>
// <div className='p-2 cursor-pointer rounded-full hover:bg-[#ff4d2d]/10  text-[#ff4d2d]' onClick={handleDelete}>
// <FaTrashAlt size={16}/>
// </div>
//           </div>

//           </div>
//       </div>
//     </div>
//   )
// }

// export default OwnerItemCard
