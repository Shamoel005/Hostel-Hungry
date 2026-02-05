import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils, FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import OwnerItemCard from './OwnerItemCard';

function OwnerDashboard() {
  const { myShopData } = useSelector(state => state.owner)
  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] pb-10'>
      <Nav />
      
      <div className='max-w-4xl mx-auto px-4'>
        {/* --- CASE 1: NO SHOP REGISTERED --- */}
        {!myShopData && (
          <div className='flex justify-center items-center pt-20'>
            <div className='w-full max-w-md bg-white shadow-xl rounded-[2rem] p-8 border border-gray-100 text-center'>
              <div className='bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <FaUtensils className='text-[#ff4d2d] text-3xl' />
              </div>
              <h2 className='text-2xl font-black text-gray-800 mb-3 uppercase tracking-tighter'>Register Restaurant</h2>
              <p className='text-gray-500 mb-8 text-sm leading-relaxed'>
                Connect with hungry students and scale your business with our digital storefront.
              </p>
              <button 
                className='w-full bg-[#ff4d2d] text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95' 
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* --- CASE 2: SHOP ACTIVE --- */}
        {myShopData && (
          <div className='flex flex-col gap-8 pt-8 animate-in fade-in duration-700'>
            
            {/* WELCOME HEADER */}
            <div className='flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50'>
                <div className='flex items-center gap-4'>
                    <div className='bg-[#ff4d2d] p-3 rounded-2xl shadow-lg shadow-orange-100'>
                        <FaUtensils className='text-white text-xl' />
                    </div>
                    <div>
                        <span className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Owner Dashboard</span>
                        <h1 className='text-xl font-black text-gray-900 uppercase tracking-tighter'>{myShopData.name}</h1>
                    </div>
                </div>
                <button 
                  className='p-3 bg-gray-50 text-gray-400 hover:text-[#ff4d2d] rounded-2xl transition-colors border border-gray-100'
                  onClick={() => navigate("/create-edit-shop")}
                >
                  <FaPen size={18} />
                </button>
            </div>

            {/* SHOP PROFILE CARD */}
            <div className='bg-white rounded-[2.5rem] overflow-hidden shadow-md border border-gray-100 group'>
                <div className='h-56 sm:h-72 overflow-hidden relative'>
                    <img src={myShopData.image} alt={myShopData.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'/>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                    <div className='absolute bottom-6 left-6 text-white'>
                        <p className='text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1'>Restaurant Location</p>
                        <p className='text-sm font-bold'>{myShopData.address}, {myShopData.city}</p>
                    </div>
                </div>
            </div>

            {/* MENU SECTION HEADER */}
            <div className='flex items-center justify-between px-2'>
                <h3 className='text-xs font-black uppercase tracking-[0.3em] text-gray-400'>Your Menu Items</h3>
                <button 
                    onClick={() => navigate("/add-item")}
                    className='bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 active:scale-95 transition-all'
                >
                    Add Food
                </button>
            </div>

            {/* MENU ITEMS LIST */}
            <div className='space-y-4'>
              {myShopData.items && myShopData.items.length > 0 ? (
                <div className='grid grid-cols-1 gap-4'>
                  {myShopData.items.map((item, index) => (
                    <OwnerItemCard data={item} key={index} />
                  ))}
                </div>
              ) : (
                <div className='bg-white p-12 rounded-[2rem] border border-dashed border-gray-200 text-center'>
                    <FaUtensils className='text-gray-200 text-4xl mx-auto mb-4' />
                    <p className='text-sm font-bold text-gray-400 uppercase tracking-widest'>No dishes added yet</p>
                    <button 
                        className='mt-4 text-[#ff4d2d] font-black text-xs uppercase tracking-widest underline underline-offset-4'
                        onClick={() => navigate("/add-item")}
                    >
                        Create First Item
                    </button>
                </div>
              )}
            </div>
            
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnerDashboard

// import React from 'react'
// import Nav from './Nav'
// import { useSelector } from 'react-redux'
// import { FaUtensils } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import { FaPen } from "react-icons/fa";
// import OwnerItemCard from './OwnerItemCard';
// function OwnerDashboard() {
//   const { myShopData } = useSelector(state => state.owner)
//   const navigate = useNavigate()

  
//   return (
//     <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center'>
//       <Nav />
//       {!myShopData &&
//         <div className='flex justify-center items-center p-4 sm:p-6'>
//           <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
//             <div className='flex flex-col items-center text-center'>
//               <FaUtensils className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
//               <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add Your Restaurant</h2>
//               <p className='text-gray-600 mb-4 text-sm sm:text-base'>Join our food delivery platform and reach thousands of hungry customers every day.
//               </p>
//               <button className='bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200' onClick={() => navigate("/create-edit-shop")}>
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>
//       }

//       {myShopData &&
//         <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>
//           <h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center'><FaUtensils className='text-[#ff4d2d] w-14 h-14 ' />Welcome to {myShopData.name}</h1>

//           <div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>
//             <div className='absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer' onClick={()=>navigate("/create-edit-shop")}>
// <FaPen size={20}/>
//             </div>
//              <img src={myShopData.image} alt={myShopData.name} className='w-full h-48 sm:h-64 object-cover'/>
//              <div className='p-4 sm:p-6'>
//               <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>{myShopData.name}</h1>
//               <p className='text-gray-500 '>{myShopData.city},{myShopData.state}</p>
//               <p className='text-gray-500 mb-4'>{myShopData.address}</p>
//             </div>
//           </div>

//           {myShopData.items.length==0 && 
//             <div className='flex justify-center items-center p-4 sm:p-6'>
//           <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
//             <div className='flex flex-col items-center text-center'>
//               <FaUtensils className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
//               <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add Your Food Item</h2>
//               <p className='text-gray-600 mb-4 text-sm sm:text-base'>Share your delicious creations with our customers by adding them to the menu.
//               </p>
//               <button className='bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200' onClick={() => navigate("/add-item")}>
//               Add Food
//               </button>
//             </div>
//           </div>
//         </div>
//             }

//             {myShopData.items.length>0 && <div className='flex flex-col items-center gap-4 w-full max-w-3xl '>
//               {myShopData.items.map((item,index)=>(
//                 <OwnerItemCard data={item} key={index}/>
//               ))}
//               </div>}
            
//         </div>}



//     </div>
//   )
// }

// export default OwnerDashboard
