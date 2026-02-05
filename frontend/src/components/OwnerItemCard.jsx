import axios from 'axios';
import React from 'react'
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({data}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDelete = async () => {
      // Basic confirmation to prevent accidental deletions
      if (window.confirm(`Are you sure you want to delete ${data.name}?`)) {
        try {
          const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}`, { withCredentials: true })
          dispatch(setMyShopData(result.data))
        } catch (error) {
          console.error("Error deleting item:", error)
        }
      }
    }

  return (
    <div className='flex bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:border-orange-200 transition-all w-full max-w-2xl'>
      {/* IMAGE SECTION */}
      <div className='w-32 sm:w-40 flex-shrink-0 bg-gray-50'>
        <img 
          src={data.image} 
          alt={data.name} 
          className='w-full h-full object-cover'
        />
      </div>

      {/* CONTENT SECTION */}
      <div className='flex flex-col justify-between p-4 flex-1'>
          <div className='space-y-1'>
            <div className='flex justify-between items-start'>
                <h2 className='text-lg font-bold text-gray-900 leading-tight'>{data.name}</h2>
                <div className='text-[#ff4d2d] font-black text-sm'>₹{data.price}</div>
            </div>
            
            <div className='flex flex-wrap gap-2 mt-2'>
                <span className='text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded-md'>
                    {data.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${data.foodType === 'veg' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {data.foodType}
                </span>
            </div>
          </div>

          <div className='flex items-center justify-end gap-3 mt-4 pt-3 border-t border-gray-50'>
            <button 
                className='p-2.5 cursor-pointer rounded-xl bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-[#ff4d2d] transition-colors' 
                onClick={() => navigate(`/edit-item/${data._id}`)}
                title="Edit Item"
            >
                <FaPen size={14}/>
            </button>
            <button 
                className='p-2.5 cursor-pointer rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors' 
                onClick={handleDelete}
                title="Delete Item"
            >
                <FaTrashAlt size={14}/>
            </button>
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
