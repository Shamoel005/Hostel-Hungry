import React, { useEffect, useState } from 'react'
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { userData, currentCity, cartItems } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/signin")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchItems = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`, { withCredentials: true })
            dispatch(setSearchItems(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (query) {
            handleSearchItems()
        } else {
            dispatch(setSearchItems(null))
        }
    }, [query])

    return (
        <div className='w-full h-[80px] flex items-center justify-between px-5 md:px-10 fixed top-0 z-[9999] bg-[#fff9f6]/80 backdrop-blur-md border-b border-orange-50'>
            
            {/* MOBILE SEARCH OVERLAY */}
            {showSearch && userData.role === "user" && (
                <div className='absolute top-[80px] left-0 w-full bg-white p-4 shadow-xl flex items-center gap-3 md:hidden animate-in slide-in-from-top duration-300'>
                    <div className='flex-1 flex items-center bg-gray-50 px-4 py-2 rounded-2xl gap-2'>
                        <IoIosSearch size={20} className='text-[#ff4d2d]' />
                        <input 
                            type="text" 
                            placeholder='Search Hostel Hungry...' 
                            className='bg-transparent outline-none text-sm w-full' 
                            onChange={(e) => setQuery(e.target.value)} 
                            value={query} 
                        />
                    </div>
                    <RxCross2 size={24} className='text-gray-400' onClick={() => setShowSearch(false)} />
                </div>
            )}

            {/* BRAND LOGO */}
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/home")}>
                <h1 className='text-xl md:text-2xl font-black text-[#ff4d2d] tracking-tighter uppercase italic'>
                    Hostel<span className='text-gray-900'>Hungry</span>
                </h1>
            </div>

            {/* DESKTOP SEARCH BAR */}
            {userData.role === "user" && (
                <div className='hidden md:flex items-center bg-white border border-orange-100 shadow-sm rounded-2xl h-[50px] w-[40%] px-4 gap-3'>
                    <div className='flex items-center gap-2 border-r border-gray-100 pr-3 max-w-[120px]'>
                        <FaLocationDot size={16} className="text-[#ff4d2d]" />
                        <span className='text-[11px] font-bold text-gray-500 uppercase truncate'>{currentCity || "Set Location"}</span>
                    </div>
                    <div className='flex items-center flex-1 gap-2'>
                        <IoIosSearch size={20} className='text-gray-300' />
                        <input 
                            type="text" 
                            placeholder='Search for food...' 
                            className='outline-none text-sm w-full bg-transparent' 
                            onChange={(e) => setQuery(e.target.value)} 
                            value={query} 
                        />
                    </div>
                </div>
            )}

            {/* ACTION ICONS & PROFILE */}
            <div className='flex items-center gap-3 md:gap-6'>
                {/* User Search Toggle (Mobile) */}
                {userData.role === "user" && !showSearch && (
                    <IoIosSearch size={26} className='text-gray-800 md:hidden' onClick={() => setShowSearch(true)} />
                )}

                {/* Owner specific actions */}
                {userData.role === "owner" && (
                    <div className='flex items-center gap-2'>
                        {myShopData && (
                            <button className='p-2 md:px-4 md:py-2 rounded-xl bg-[#ff4d2d] text-white flex items-center gap-2 shadow-lg shadow-orange-200 transition-transform active:scale-90' onClick={() => navigate("/add-item")}>
                                <FaPlus size={18} />
                                <span className='hidden md:block text-xs font-black uppercase tracking-widest'>Add Item</span>
                            </button>
                        )}
                        <button className='p-2 md:px-4 md:py-2 rounded-xl bg-gray-900 text-white flex items-center gap-2 transition-transform active:scale-90' onClick={() => navigate("/my-orders")}>
                            <TbReceipt2 size={20} />
                            <span className='hidden md:block text-xs font-black uppercase tracking-widest'>Orders</span>
                        </button>
                    </div>
                )}

                {/* User specific actions */}
                {userData.role === "user" && (
                    <>
                        <div className='relative cursor-pointer group' onClick={() => navigate("/cart")}>
                            <FiShoppingCart size={24} className='text-gray-800 group-hover:text-[#ff4d2d] transition-colors' />
                            {cartItems?.length > 0 && (
                                <span className='absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#fff9f6] animate-bounce'>
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                        <button className='hidden lg:block text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors' onClick={() => navigate("/my-orders")}>
                            My Orders
                        </button>
                    </>
                )}

                {/* PROFILE AVATAR & DROPDOWN */}
                <div className='relative'>
                    <div 
                        className='w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center text-white text-sm font-black cursor-pointer shadow-lg active:scale-90 transition-all border-2 border-white'
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        {userData?.fullName?.charAt(0)}
                    </div>

                    {/* Fixed Dropdown Position */}
                    {showInfo && (
                        <>
                            <div className='fixed inset-0 z-[-1]' onClick={() => setShowInfo(false)}></div>
                            <div className='absolute top-[55px] right-0 w-[200px] bg-white shadow-2xl rounded-[1.5rem] p-4 border border-orange-50 animate-in fade-in zoom-in-95 duration-200'>
                                <div className='mb-3 pb-3 border-b border-gray-50'>
                                    <p className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Account</p>
                                    <p className='text-sm font-bold text-gray-900 truncate'>{userData.fullName}</p>
                                </div>
                                <div className='space-y-1'>
                                    <button className='w-full text-left px-3 py-2 text-xs font-bold text-gray-600 hover:bg-orange-50 hover:text-[#ff4d2d] rounded-xl transition-colors' onClick={() => { navigate("/my-orders"); setShowInfo(false); }}>
                                        My Orders
                                    </button>
                                    <button className='w-full text-left px-3 py-2 text-xs font-black text-[#ff4d2d] hover:bg-red-50 rounded-xl transition-colors mt-2 uppercase tracking-widest' onClick={handleLogOut}>
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Nav

// import React, { useEffect, useState } from 'react'
// import { FaLocationDot } from "react-icons/fa6";
// import { IoIosSearch } from "react-icons/io";
// import { FiShoppingCart } from "react-icons/fi";
// import { useDispatch, useSelector } from 'react-redux';
// import { RxCross2 } from "react-icons/rx";
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { setSearchItems, setUserData } from '../redux/userSlice';
// import { FaPlus } from "react-icons/fa6";
// import { TbReceipt2 } from "react-icons/tb";
// import { useNavigate } from 'react-router-dom';
// function Nav() {
//     const { userData, currentCity ,cartItems} = useSelector(state => state.user)
//         const { myShopData} = useSelector(state => state.owner)
//     const [showInfo, setShowInfo] = useState(false)
//     const [showSearch, setShowSearch] = useState(false)
//     const [query,setQuery]=useState("")
//     const dispatch = useDispatch()
//     const navigate=useNavigate()
//     const handleLogOut = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
//             dispatch(setUserData(null))
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleSearchItems=async () => {
//       try {
//         const result=await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,{withCredentials:true})
//     dispatch(setSearchItems(result.data))
//       } catch (error) {
//         console.log(error)
//       }
//     }

//     useEffect(()=>{
//         if(query){
// handleSearchItems()
//         }else{
//               dispatch(setSearchItems(null))
//         }

//     },[query])
//     return (
//         <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>

//             {showSearch && userData.role == "user" && <div className='w-[90%] h-[70px]  bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden'>
//                 <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
//                     <FaLocationDot size={25} className=" text-[#ff4d2d]" />
//                     <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
//                 </div>
//                 <div className='w-[80%] flex items-center gap-[10px]'>
//                     <IoIosSearch size={25} className='text-[#ff4d2d]' />
//                     <input type="text" placeholder='search delicious food...' className='px-[10px] text-gray-700 outline-0 w-full' onChange={(e)=>setQuery(e.target.value)} value={query}/>
//                 </div>
//             </div>}



//             <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Vingo</h1>
//             {userData.role == "user" && <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex'>
//                 <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
//                     <FaLocationDot size={25} className=" text-[#ff4d2d]" />
//                     <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
//                 </div>
//                 <div className='w-[80%] flex items-center gap-[10px]'>
//                     <IoIosSearch size={25} className='text-[#ff4d2d]' />
//                     <input type="text" placeholder='search delicious food...' className='px-[10px] text-gray-700 outline-0 w-full' onChange={(e)=>setQuery(e.target.value)} value={query}/>
//                 </div>
//             </div>}

//             <div className='flex items-center gap-4'>
//                 {userData.role == "user" && (showSearch ? <RxCross2 size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(false)} /> : <IoIosSearch size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)} />)
//                 }
//                 {userData.role == "owner"? <>
//                  {myShopData && <> <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={()=>navigate("/add-item")}>
//                         <FaPlus size={20} />
//                         <span>Add Food Item</span>
//                     </button>
//                       <button className='md:hidden flex items-center  p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={()=>navigate("/add-item")}>
//                         <FaPlus size={20} />
//                     </button></>}
                   
//                     <div className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium' onClick={()=>navigate("/my-orders")}>
//                       <TbReceipt2 size={20}/>
//                       <span>My Orders</span>
                      
//                     </div>
//                      <div className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium' onClick={()=>navigate("/my-orders")}>
//                       <TbReceipt2 size={20}/>
                      
//                     </div>
//                 </>: (
//                     <>
//                  {userData.role=="user" &&    <div className='relative cursor-pointer' onClick={()=>navigate("/cart")}>
//                     <FiShoppingCart size={25} className='text-[#ff4d2d]' />
//                     <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>{cartItems.length}</span>
//                 </div>}   
           


//                 <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium' onClick={()=>navigate("/my-orders")}>
//                     My Orders
//                 </button>
//                     </>
//                 )}



//                 <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={() => setShowInfo(prev => !prev)}>
//                     {userData?.fullName.slice(0, 1)}
//                 </div>
//                 {showInfo && <div className={`fixed top-[80px] right-[10px] 
//                     ${userData.role=="deliveryBoy"?"md:right-[20%] lg:right-[40%]":"md:right-[10%] lg:right-[25%]"} w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]`}>
//                     <div className='text-[17px] font-semibold'>{userData.fullName}</div>
//                     {userData.role=="user" && <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer' onClick={()=>navigate("/my-orders")}>My Orders</div>}
                    
//                     <div className='text-[#ff4d2d] font-semibold cursor-pointer' onClick={handleLogOut}>Log Out</div>
//                 </div>}

//             </div>
//         </div>
//     )
// }


// export default Nav
