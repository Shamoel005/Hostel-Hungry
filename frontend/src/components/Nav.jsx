import React, { useEffect, useState } from 'react';
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';

function Nav() {
    const { userData, currentCity, cartItems } = useSelector(state => state.user);
    const { myShopData } = useSelector(state => state.owner);
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
            dispatch(setUserData(null));
            navigate('/'); // Redirect to landing/login after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleSearchItems = async () => {
        if (!currentCity) return;
        try {
            const result = await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`, { withCredentials: true });
            dispatch(setSearchItems(result.data));
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                handleSearchItems();
            } else {
                dispatch(setSearchItems(null));
            }
        }, 400); // Debounce search for stability

        return () => clearTimeout(timer);
    }, [query]);

    // Deployment Guard: If userData isn't loaded yet, show a minimal bar or null
    if (!userData) return <div className="h-[80px] bg-[#fff9f6] w-full animate-pulse" />;

    return (
        <nav className='w-full h-[80px] flex items-center justify-between px-6 fixed top-0 z-[9999] bg-[#fff9f6]/95 backdrop-blur-md border-b border-orange-50 shadow-sm'>
            
            {/* LOGO */}
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate(userData.role === 'owner' ? '/owner-dashboard' : '/user-dashboard')}>
                <h1 className='text-3xl font-black tracking-tighter text-[#ff4d2d] uppercase'>Vingo</h1>
            </div>

            {/* DESKTOP SEARCH (USER ONLY) */}
            {userData.role === "user" && (
                <div className='hidden md:flex items-center bg-white border border-gray-100 shadow-sm rounded-2xl h-[50px] w-full max-w-md overflow-hidden'>
                    <div className='flex items-center gap-2 px-4 border-r border-gray-100 min-w-[120px]'>
                        <FaLocationDot className="text-[#ff4d2d]" size={18} />
                        <span className='text-[10px] font-black uppercase tracking-widest text-gray-400 truncate w-20'>{currentCity || "Select..."}</span>
                    </div>
                    <div className='flex items-center flex-1 px-4 gap-2'>
                        <IoIosSearch size={20} className='text-gray-400' />
                        <input 
                            type="text" 
                            placeholder='Search menu...' 
                            className='w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-300'
                            onChange={(e) => setQuery(e.target.value)} 
                            value={query}
                        />
                    </div>
                </div>
            )}

            {/* ACTIONS */}
            <div className='flex items-center gap-5'>
                {/* SEARCH TOGGLE (MOBILE USER) */}
                {userData.role === "user" && (
                    <button className='md:hidden p-2 text-[#ff4d2d]' onClick={() => setShowSearch(!showSearch)}>
                        {showSearch ? <RxCross2 size={24} /> : <IoIosSearch size={24} />}
                    </button>
                )}

                {/* OWNER CONTROLS */}
                {userData.role === "owner" && (
                    <div className='flex items-center gap-3'>
                        {myShopData && (
                            <button className='flex items-center gap-2 bg-[#ff4d2d] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-200' onClick={() => navigate("/add-item")}>
                                <FaPlus size={14} />
                                <span className='hidden sm:inline'>Add Food</span>
                            </button>
                        )}
                        <button className='p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-black hover:text-white transition-all' onClick={() => navigate("/my-orders")}>
                            <TbReceipt2 size={20} />
                        </button>
                    </div>
                )}

                {/* USER CONTROLS */}
                {userData.role === "user" && (
                    <div className='flex items-center gap-5'>
                        <button className='relative p-2 text-gray-900 group' onClick={() => navigate("/cart")}>
                            <FiShoppingCart size={22} />
                            {cartItems?.length > 0 && (
                                <span className='absolute -top-1 -right-1 bg-[#ff4d2d] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#fff9f6]'>
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                        <button className='hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black' onClick={() => navigate("/my-orders")}>
                            Orders
                        </button>
                    </div>
                )}

                {/* PROFILE DROPDOWN */}
                <div className='relative'>
                    <button 
                        className='w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-black text-sm shadow-xl shadow-black/10 active:scale-90 transition-all'
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        {userData?.fullName?.charAt(0)}
                    </button>

                    {showInfo && (
                        <div className='absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-gray-50 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300'>
                            <div>
                                <p className='text-[10px] font-black uppercase tracking-widest text-gray-300'>Account</p>
                                <p className='text-sm font-black text-black truncate'>{userData.fullName}</p>
                            </div>
                            <hr className='border-gray-50' />
                            {userData.role === "user" && (
                                <button className='md:hidden text-left text-xs font-bold text-gray-600' onClick={() => navigate("/my-orders")}>My Orders</button>
                            )}
                            <button className='text-left text-xs font-black uppercase text-red-500 tracking-widest' onClick={handleLogOut}>Sign Out</button>
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE SEARCH OVERLAY */}
            {showSearch && userData.role === "user" && (
                <div className='absolute top-[80px] left-0 w-full bg-[#fff9f6] p-4 md:hidden border-b border-orange-100 animate-in slide-in-from-top duration-300'>
                    <div className='flex items-center bg-white rounded-2xl p-3 border border-orange-100 shadow-inner'>
                        <IoIosSearch size={20} className='text-[#ff4d2d] mr-2' />
                        <input 
                            type="text" 
                            placeholder='Search food...' 
                            className='w-full bg-transparent outline-none text-sm font-bold'
                            autoFocus
                            onChange={(e) => setQuery(e.target.value)} 
                            value={query}
                        />
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;


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
