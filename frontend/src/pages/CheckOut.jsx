import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSearchOutline, IoLocationSharp, IoShieldCheckmark } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { setAddress, setLocation } from '../redux/mapSlice';
import { MdDeliveryDining } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import axios from 'axios';
import { FaMobileScreenButton } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { addMyOrder } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';

function RecenterMap({ location }) {
    if (location.lat && location.lon) {
        const map = useMap()
        map.setView([location.lat, location.lon], 16, { animate: true })
    }
    return null
}

function CheckOut() {
    const { location, address } = useSelector(state => state.map)
    const { cartItems, totalAmount, userData } = useSelector(state => state.user)
    const [addressInput, setAddressInput] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [isProcessing, setIsProcessing] = useState(false)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const apiKey = import.meta.env.VITE_GEOAPIKEY
    const deliveryFee = totalAmount > 500 ? 0 : 40
    const AmountWithDeliveryFee = totalAmount + deliveryFee

    const onDragEnd = (e) => {
        const { lat, lng } = e.target._latlng
        dispatch(setLocation({ lat, lon: lng }))
        getAddressByLatLng(lat, lng)
    }

    const getCurrentLocation = () => {
        const latitude = userData.location.coordinates[1]
        const longitude = userData.location.coordinates[0]
        dispatch(setLocation({ lat: latitude, lon: longitude }))
        getAddressByLatLng(latitude, longitude)
    }

    const getAddressByLatLng = async (lat, lng) => {
        try {
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
            dispatch(setAddress(result?.data?.results[0].address_line2))
        } catch (error) {
            console.error(error)
        }
    }

    const getLatLngByAddress = async () => {
        try {
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
            const { lat, lon } = result.data.features[0].properties
            dispatch(setLocation({ lat, lon }))
        } catch (error) {
            console.error(error)
        }
    }

    const handlePlaceOrder = async () => {
        setIsProcessing(true)
        try {
            const result = await axios.post(`${serverUrl}/api/order/place-order`, {
                paymentMethod,
                deliveryAddress: {
                    text: addressInput,
                    latitude: location.lat,
                    longitude: location.lon
                },
                totalAmount: AmountWithDeliveryFee,
                cartItems
            }, { withCredentials: true })

            if (paymentMethod === "cod") {
                dispatch(addMyOrder(result.data))
                navigate("/order-placed")
            } else {
                const { orderId, razorOrder } = result.data
                openRazorpayWindow(orderId, razorOrder)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsProcessing(false)
        }
    }

    const openRazorpayWindow = (orderId, razorOrder) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: razorOrder.amount,
            currency: 'INR',
            name: "HOSTEL HUNGRY",
            description: "Premium Campus Delivery",
            order_id: razorOrder.id,
            handler: async function (response) {
                try {
                    const result = await axios.post(`${serverUrl}/api/order/verify-payment`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        orderId
                    }, { withCredentials: true })
                    dispatch(addMyOrder(result.data))
                    navigate("/order-placed")
                } catch (error) {
                    console.error(error)
                }
            },
            theme: { color: "#000000" }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    useEffect(() => { setAddressInput(address) }, [address])

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white pb-20'>
            {/* --- NAVIGATION --- */}
            <div className='max-w-6xl mx-auto px-6 pt-10 flex items-center justify-between'>
                <button 
                    onClick={() => navigate("/")}
                    className="p-3 rounded-full bg-[#f5f5f7] hover:bg-black hover:text-white transition-all"
                >
                    <IoIosArrowRoundBack size={28} />
                </button>
                <div className="text-right">
                    <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Order Verification</span>
                    <h1 className='text-2xl font-black tracking-tighter text-black uppercase'>Final Step.</h1>
                </div>
            </div>

            <main className='max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12'>
                
                {/* LEFT: LOGISTICS */}
                <div className='lg:col-span-7 space-y-12 animate-fade-up'>
                    
                    {/* LOCATION SECTION */}
                    <section className='space-y-6'>
                        <div className="flex items-center justify-between">
                            <h2 className='text-[11px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2'>
                                <IoLocationSharp /> Delivery Point
                            </h2>
                            <button onClick={getCurrentLocation} className="text-[10px] font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors">
                                <TbCurrentLocation size={14}/> Use Saved Address
                            </button>
                        </div>

                        <div className='relative group'>
                            <input 
                                type="text" 
                                className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 pr-28 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                placeholder='Hostel, Wing, Room Number...'
                                value={addressInput}
                                onChange={(e) => setAddressInput(e.target.value)}
                            />
                            <button 
                                onClick={getLatLngByAddress}
                                className='absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-[16px] hover:scale-105 active:scale-95 transition-all'
                            >
                                <IoSearchOutline size={18} />
                            </button>
                        </div>

                        <div className='h-[350px] rounded-[32px] overflow-hidden border-4 border-[#f5f5f7] shadow-inner relative'>
                            <MapContainer className="w-full h-full z-0" center={[location?.lat, location?.lon]} zoom={16}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <RecenterMap location={location} />
                                <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />
                            </MapContainer>
                        </div>
                    </section>

                    {/* PAYMENT SECTION */}
                    <section className='space-y-6'>
                        <h2 className='text-[11px] font-black uppercase tracking-[0.2em] text-black'>Select Transaction Method</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <button 
                                onClick={() => setPaymentMethod("cod")}
                                className={`flex items-center gap-4 rounded-[24px] border-2 p-5 text-left transition-all ${paymentMethod === "cod" ? "border-black bg-black text-white shadow-xl" : "border-[#f5f5f7] bg-white hover:border-gray-200"}`}
                            >
                                <div className={`p-3 rounded-xl ${paymentMethod === "cod" ? "bg-white/10" : "bg-green-50"}`}>
                                    <MdDeliveryDining className={paymentMethod === "cod" ? "text-white" : "text-green-600"} size={24} />
                                </div>
                                <div>
                                    <p className='font-black text-[12px] uppercase tracking-wider'>Cash / Handover</p>
                                    <p className={`text-[10px] ${paymentMethod === "cod" ? "text-gray-400" : "text-gray-500"}`}>Pay on arrival</p>
                                </div>
                            </button>

                            <button 
                                onClick={() => setPaymentMethod("online")}
                                className={`flex items-center gap-4 rounded-[24px] border-2 p-5 text-left transition-all ${paymentMethod === "online" ? "border-black bg-black text-white shadow-xl" : "border-[#f5f5f7] bg-white hover:border-gray-200"}`}
                            >
                                <div className={`p-3 rounded-xl ${paymentMethod === "online" ? "bg-white/10" : "bg-blue-50"}`}>
                                    <FaCreditCard className={paymentMethod === "online" ? "text-white" : "text-blue-600"} size={22} />
                                </div>
                                <div>
                                    <p className='font-black text-[12px] uppercase tracking-wider'>Digital / UPI</p>
                                    <p className={`text-[10px] ${paymentMethod === "online" ? "text-gray-400" : "text-gray-500"}`}>Secure Encryption</p>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>

                {/* RIGHT: SUMMARY */}
                <div className='lg:col-span-5'>
                    <div className='bg-[#f5f5f7] rounded-[40px] p-8 sticky top-10 animate-fade-up' style={{ animationDelay: '200ms' }}>
                        <h3 className='text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8'>Manifest Summary</h3>
                        
                        <div className='space-y-5 mb-10'>
                            {cartItems.map((item, index) => (
                                <div key={index} className='flex justify-between items-center group'>
                                    <div className='flex items-center gap-3'>
                                        <span className='w-6 h-6 flex items-center justify-center bg-white rounded-full text-[10px] font-black'>{item.quantity}</span>
                                        <span className='text-sm font-bold text-black uppercase tracking-tight'>{item.name}</span>
                                    </div>
                                    <span className='text-sm font-black'>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className='border-t border-gray-200 pt-8 space-y-4'>
                            <div className='flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest'>
                                <span>Cart Value</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div className='flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest'>
                                <span>Logistics Fee</span>
                                <span className={deliveryFee === 0 ? "text-green-600" : ""}>{deliveryFee === 0 ? "WAIVED" : `₹${deliveryFee}`}</span>
                            </div>
                            <div className='flex justify-between items-end pt-4'>
                                <span className='text-[10px] font-black uppercase tracking-[0.4em] text-black'>Total Payable</span>
                                <span className='text-4xl font-black tracking-tighter text-black'>₹{AmountWithDeliveryFee}</span>
                            </div>
                        </div>

                        <button 
                            className='w-full mt-10 bg-black text-white py-6 rounded-[28px] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center'
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                        >
                            {isProcessing ? <ClipLoader size={20} color='white' /> : (paymentMethod === "cod" ? "Confirm Order" : "Initiate Secure Payment")}
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
                            <IoShieldCheckmark size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Encrypted Checkout</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CheckOut;


// import React, { useEffect, useState } from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoSearchOutline } from "react-icons/io5";
// import { TbCurrentLocation } from "react-icons/tb";
// import { IoLocationSharp } from "react-icons/io5";
// import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
// import { useDispatch, useSelector } from 'react-redux';
// import "leaflet/dist/leaflet.css"
// import { setAddress, setLocation } from '../redux/mapSlice';
// import { MdDeliveryDining } from "react-icons/md";
// import { FaCreditCard } from "react-icons/fa";
// import axios from 'axios';
// import { FaMobileScreenButton } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { addMyOrder, setTotalAmount } from '../redux/userSlice';
// function RecenterMap({ location }) {
//   if (location.lat && location.lon) {
//     const map = useMap()
//     map.setView([location.lat, location.lon], 16, { animate: true })
//   }
//   return null

// }

// function CheckOut() {
//   const { location, address } = useSelector(state => state.map)
//     const { cartItems ,totalAmount,userData} = useSelector(state => state.user)
//   const [addressInput, setAddressInput] = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("cod")
//   const navigate=useNavigate()
//   const dispatch = useDispatch()
//   const apiKey = import.meta.env.VITE_GEOAPIKEY
//   const deliveryFee=totalAmount>500?0:40
//   const AmountWithDeliveryFee=totalAmount+deliveryFee






//   const onDragEnd = (e) => {
//     const { lat, lng } = e.target._latlng
//     dispatch(setLocation({ lat, lon: lng }))
//     getAddressByLatLng(lat, lng)
//   }
//   const getCurrentLocation = () => {
//       const latitude=userData.location.coordinates[1]
//       const longitude=userData.location.coordinates[0]
//       dispatch(setLocation({ lat: latitude, lon: longitude }))
//       getAddressByLatLng(latitude, longitude)
   

//   }

//   const getAddressByLatLng = async (lat, lng) => {
//     try {

//       const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
//       dispatch(setAddress(result?.data?.results[0].address_line2))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getLatLngByAddress = async () => {
//     try {
//       const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
//       const { lat, lon } = result.data.features[0].properties
//       dispatch(setLocation({ lat, lon }))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handlePlaceOrder=async () => {
//     try {
//       const result=await axios.post(`${serverUrl}/api/order/place-order`,{
//         paymentMethod,
//         deliveryAddress:{
//           text:addressInput,
//           latitude:location.lat,
//           longitude:location.lon
//         },
//         totalAmount:AmountWithDeliveryFee,
//         cartItems
//       },{withCredentials:true})

//       if(paymentMethod=="cod"){
//       dispatch(addMyOrder(result.data))
//       navigate("/order-placed")
//       }else{
//         const orderId=result.data.orderId
//         const razorOrder=result.data.razorOrder
//           openRazorpayWindow(orderId,razorOrder)
//        }
    
//     } catch (error) {
//       console.log(error)
//     }
//   }

// const openRazorpayWindow=(orderId,razorOrder)=>{

//   const options={
//  key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//  amount:razorOrder.amount,
//  currency:'INR',
//  name:"Vingo",
//  description:"Food Delivery Website",
//  order_id:razorOrder.id,
//  handler:async function (response) {
//   try {
//     const result=await axios.post(`${serverUrl}/api/order/verify-payment`,{
//       razorpay_payment_id:response.razorpay_payment_id,
//       orderId
//     },{withCredentials:true})
//         dispatch(addMyOrder(result.data))
//       navigate("/order-placed")
//   } catch (error) {
//     console.log(error)
//   }
//  }
//   }

//   const rzp=new window.Razorpay(options)
//   rzp.open()


// }


//   useEffect(() => {
//     setAddressInput(address)
//   }, [address])
//   return (
//     <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>
//       <div className=' absolute top-[20px] left-[20px] z-[10]' onClick={() => navigate("/")}>
//         <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
//       </div>
//       <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>
//         <h1 className='text-2xl font-bold text-gray-800'>Checkout</h1>

//         <section>
//           <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'><IoLocationSharp className='text-[#ff4d2d]' /> Delivery Location</h2>
//           <div className='flex gap-2 mb-3'>
//             <input type="text" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]' placeholder='Enter Your Delivery Address..' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
//             <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getLatLngByAddress}><IoSearchOutline size={17} /></button>
//             <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getCurrentLocation}><TbCurrentLocation size={17} /></button>
//           </div>
//           <div className='rounded-xl border overflow-hidden'>
//             <div className='h-64 w-full flex items-center justify-center'>
//               <MapContainer
//                 className={"w-full h-full"}
//                 center={[location?.lat, location?.lon]}
//                 zoom={16}
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <RecenterMap location={location} />
//                 <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />


//               </MapContainer>
//             </div>
//           </div>
//         </section>

//         <section>
//           <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>
//           <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
//             <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"
//               }`} onClick={() => setPaymentMethod("cod")}>

//               <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
//                 <MdDeliveryDining className='text-green-600 text-xl' />
//               </span>
//               <div >
//                 <p className='font-medium text-gray-800'>Cash On Delivery</p>
//                 <p className='text-xs text-gray-500'>Pay when your food arrives</p>
//               </div>

//             </div>
//             <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"
//               }`} onClick={() => setPaymentMethod("online")}>

//               <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
//                 <FaMobileScreenButton className='text-purple-700 text-lg' />
//               </span>
//               <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
//                 <FaCreditCard className='text-blue-700 text-lg' />
//               </span>
//               <div>
//                 <p className='font-medium text-gray-800'>UPI / Credit / Debit Card</p>
//                 <p className='text-xs text-gray-500'>Pay Securely Online</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section>
//           <h2 className='text-lg font-semibold mb-3 text-gray-800'>Order Summary</h2>
// <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
// {cartItems.map((item,index)=>(
//   <div key={index} className='flex justify-between text-sm text-gray-700'>
// <span>{item.name} x {item.quantity}</span>
// <span>₹{item.price*item.quantity}</span>
//   </div>
 
// ))}
//  <hr className='border-gray-200 my-2'/>
// <div className='flex justify-between font-medium text-gray-800'>
//   <span>Subtotal</span>
//   <span>{totalAmount}</span>
// </div>
// <div className='flex justify-between text-gray-700'>
//   <span>Delivery Fee</span>
//   <span>{deliveryFee==0?"Free":deliveryFee}</span>
// </div>
// <div className='flex justify-between text-lg font-bold text-[#ff4d2d] pt-2'>
//     <span>Total</span>
//   <span>{AmountWithDeliveryFee}</span>
// </div>
// </div>
//         </section>
//         <button className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white py-3 rounded-xl font-semibold' onClick={handlePlaceOrder}> {paymentMethod=="cod"?"Place Order":"Pay & Place Order"}</button>

//       </div>
//     </div>
//   )
// }

// export default CheckOut
