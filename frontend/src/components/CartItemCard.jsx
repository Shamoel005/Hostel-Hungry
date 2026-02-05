import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';

function CartItemCard({data}) {
    const dispatch = useDispatch()
    
    const handleIncrease = (id, currentQty) => {
       dispatch(updateQuantity({id, quantity: currentQty + 1}))
    }
    
    const handleDecrease = (id, currentQty) => {
        if(currentQty > 1){
            dispatch(updateQuantity({id, quantity: currentQty - 1}))
        }
    }

  return (
    <div className='flex items-center justify-between bg-white p-3 md:p-4 rounded-[2rem] shadow-sm border border-gray-100 hover:border-orange-100 transition-all group'>
      <div className='flex items-center gap-4'>
        {/* IMAGE CONTAINER */}
        <div className='relative'>
            <img 
                src={data.image} 
                alt={data.name} 
                className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-2xl border border-gray-50 group-hover:scale-105 transition-transform'
            />
            {data.foodType === 'veg' && (
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
            )}
        </div>

        {/* INFO SECTION */}
        <div>
            <h1 className='text-sm md:text-base font-black text-gray-900 uppercase tracking-tighter leading-tight'>
                {data.name}
            </h1>
            <div className='flex items-center gap-2 mt-1'>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                    ₹{data.price}
                </p>
                <span className='text-gray-200 text-[10px]'>|</span>
                <p className="text-xs font-black text-[#ff4d2d]">
                    ₹{data.price * data.quantity}
                </p>
            </div>
        </div>
      </div>

      {/* CONTROLS SECTION */}
      <div className='flex items-center gap-2 md:gap-4'>
        <div className='flex items-center bg-gray-50 rounded-xl p-1 gap-1'>
            <button 
                className='w-8 h-8 flex items-center justify-center cursor-pointer bg-white rounded-lg shadow-sm hover:text-[#ff4d2d] transition-all active:scale-90' 
                onClick={() => handleDecrease(data.id, data.quantity)}
            >
                <FaMinus size={10}/>
            </button>
            
            <span className='w-6 text-center text-xs font-black text-gray-900'>{data.quantity}</span>
            
            <button 
                className='w-8 h-8 flex items-center justify-center cursor-pointer bg-white rounded-lg shadow-sm hover:text-[#ff4d2d] transition-all active:scale-90'  
                onClick={() => handleIncrease(data.id, data.quantity)}
            >
                <FaPlus size={10}/>
            </button>
        </div>

        <button 
            className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
            onClick={() => dispatch(removeCartItem(data.id))}
        >
            <CiTrash size={20} strokeWidth={1}/>
        </button>
      </div>
    </div>
  )
}

export default CartItemCard


// import React from 'react'
// import { FaMinus } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import { CiTrash } from "react-icons/ci";
// import { useDispatch } from 'react-redux';
// import { removeCartItem, updateQuantity } from '../redux/userSlice';
// function CartItemCard({data}) {
//     const dispatch=useDispatch()
//     const handleIncrease=(id,currentQty)=>{
//        dispatch(updateQuantity({id,quantity:currentQty+1}))
//     }
//       const handleDecrease=(id,currentQty)=>{
//         if(currentQty>1){
//   dispatch(updateQuantity({id,quantity:currentQty-1}))
//         }
        
//     }
//   return (
//     <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border'>
//       <div className='flex items-center gap-4'>
//         <img src={data.image} alt="" className='w-20 h-20 object-cover rounded-lg border'/>
//         <div>
//             <h1 className='font-medium text-gray-800'>{data.name}</h1>
//             <p className='text-sm text-gray-500'>₹{data.price} x {data.quantity}</p>
//             <p className="font-bold text-gray-900">₹{data.price*data.quantity}</p>
//         </div>
//       </div>
//       <div className='flex items-center gap-3'>
//         <button className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200' onClick={()=>handleDecrease(data.id,data.quantity)}>
//         <FaMinus size={12}/>
//         </button>
//         <span>{data.quantity}</span>
//         <button className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200'  onClick={()=>handleIncrease(data.id,data.quantity)}>
//         <FaPlus size={12}/>
//         </button>
//         <button className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
//  onClick={()=>dispatch(removeCartItem(data.id))}>
// <CiTrash size={18}/>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CartItemCard
