import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStore, FaPhoneAlt, FaUserTie } from "react-icons/fa"; // Added icons
import { FaLocationDot, FaUtensils, FaArrowLeft } from "react-icons/fa6";
import FoodCard from '../components/FoodCard';

function Shop() {
    const { shopId } = useParams()
    const [items, setItems] = useState([])
    const [shop, setShop] = useState(null) // Changed to null for cleaner checks
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
        <div className='min-h-screen bg-gray-50'>
            <button className='absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full shadow-md transition' onClick={() => navigate("/")}>
                <FaArrowLeft />
                <span>Back</span>
            </button>

            {shop && (
                <>
                    <div className='relative w-full h-64 md:h-80 lg:h-96'>
                        <img src={shop.image} alt="" className='w-full h-full object-cover' />
                        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4'>
                            <FaStore className='text-white text-4xl mb-3 drop-shadow-md' />
                            <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</h1>
                            <div className='flex items-center gap-[10px] mt-2'>
                                <FaLocationDot size={20} className='text-red-500' />
                                <p className='text-lg font-medium text-gray-200'>{shop.address}, {shop.city}</p>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Merchant/Owner Info Section */}
                    <div className='max-w-7xl mx-auto px-6 mt-6'>
                        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-6 items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='bg-orange-100 p-3 rounded-full'>
                                    <FaUserTie className='text-[#ff4d2d] text-xl' />
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500 uppercase tracking-wider font-bold'>Shop Owner</p>
                                    <p className='text-lg font-semibold text-gray-800'>
                                        {shop.owner?.fullName || "Verified Merchant"}
                                    </p>
                                </div>
                            </div>

                            {shop.owner?.mobile && (
                                <div className='flex items-center gap-4'>
                                    <div className='bg-green-100 p-3 rounded-full'>
                                        <FaPhoneAlt className='text-green-600 text-lg' />
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-500 uppercase tracking-wider font-bold'>Contact Details</p>
                                        <p className='text-lg font-semibold text-gray-800'>{shop.owner.mobile}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            <div className='max-w-7xl mx-auto px-6 py-10'>
                <h2 className='flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800'>
                    <FaUtensils className='text-red-500' /> Our Menu
                </h2>

                {items.length > 0 ? (
                    <div className='flex flex-wrap justify-center gap-8'>
                        {items.map((item) => (
                            <FoodCard key={item._id} data={item} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-500 text-lg'>No Items Available</p>
                )}
            </div>
        </div>
    )
}

export default Shop;


// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { serverUrl } from '../App'
// import { useNavigate, useParams } from 'react-router-dom'
// import { FaStore } from "react-icons/fa6";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaUtensils } from "react-icons/fa";
// import FoodCard from '../components/FoodCard';
// import { FaArrowLeft } from "react-icons/fa";
// function Shop() {
//     const {shopId}=useParams()
//     const [items,setItems]=useState([])
//     const [shop,setShop]=useState([])
//     const navigate=useNavigate()
//     const handleShop=async () => {
//         try {
//            const result=await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`,{withCredentials:true}) 
//            setShop(result.data.shop)
//            setItems(result.data.items)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
// handleShop()
//     },[shopId])
//   return (
//     <div className='min-h-screen bg-gray-50'>
//         <button className='absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full shadow-md transition' onClick={()=>navigate("/")}>
//         <FaArrowLeft />
// <span>Back</span>
//         </button>
//       {shop && <div className='relative w-full h-64 md:h-80 lg:h-96'>
//           <img src={shop.image} alt="" className='w-full h-full object-cover'/>
//           <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4'>
//           <FaStore className='text-white text-4xl mb-3 drop-shadow-md'/>
//           <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</h1>
//           <div className='flex items-center  gap-[10px]'>
//           <FaLocationDot size={22} color='red'/>
//              <p className='text-lg font-medium text-gray-200 mt-[10px]'>{shop.address}</p>
//              </div>
//           </div>
       
//         </div>}

// <div className='max-w-7xl mx-auto px-6 py-10'>
// <h2 className='flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800'><FaUtensils color='red'/> Our Menu</h2>

// {items.length>0?(
//     <div className='flex flex-wrap justify-center gap-8'>
//         {items.map((item)=>(
//             <FoodCard data={item}/>
//         ))}
//     </div>
// ):<p className='text-center text-gray-500 text-lg'>No Items Available</p>}
// </div>



//     </div>
//   )
// }

// export default Shop
