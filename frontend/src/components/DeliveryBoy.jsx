import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import { useState } from 'react'
import DeliveryBoyTracking from './DeliveryBoyTracking'
import { ClipLoader } from 'react-spinners'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function DeliveryBoy() {
  const { userData, socket } = useSelector(state => state.user)
  const [currentOrder, setCurrentOrder] = useState()
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [availableAssignments, setAvailableAssignments] = useState(null)
  const [otp, setOtp] = useState("")
  const [todayDeliveries, setTodayDeliveries] = useState([])
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return
    let watchId
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setDeliveryBoyLocation({ lat: latitude, lon: longitude })
        socket.emit('updateLocation', {
          latitude,
          longitude,
          userId: userData._id
        })
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true
      })
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [socket, userData])

  const ratePerDelivery = 50
  const totalEarning = todayDeliveries.reduce((sum, d) => sum + d.count * ratePerDelivery, 0)

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })
      setAvailableAssignments(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      setCurrentOrder(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      await getCurrentOrder()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socket.on('newAssignment', (data) => {
      setAvailableAssignments(prev => ([...prev, data]))
    })
    return () => {
      socket.off('newAssignment')
    }
  }, [socket])

  const sendOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id
      }, { withCredentials: true })
      setLoading(false)
      setShowOtpBox(true)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setMessage("")
    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp
      }, { withCredentials: true })
      setMessage(result.data.message)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`, { withCredentials: true })
      setTodayDeliveries(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAssignments()
    getCurrentOrder()
    handleTodayDeliveries()
  }, [userData])

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] pb-10'>
      <Nav />
      <div className='max-w-[800px] mx-auto px-4 pt-4 flex flex-col gap-6'>
        
        {/* --- WELCOME & GPS STATUS --- */}
        <div className='bg-white rounded-[2rem] shadow-sm p-6 flex items-center justify-between border border-orange-50'>
          <div className='flex flex-col'>
            <span className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Rider Active</span>
            <h1 className='text-xl font-black text-gray-900 tracking-tighter uppercase'>Hello, {userData.fullName.split(' ')[0]}</h1>
          </div>
          <div className='bg-green-50 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-[10px] font-bold text-green-700 uppercase tracking-widest'>GPS Online</span>
          </div>
        </div>

        {/* --- EARNINGS & PERFORMANCE --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-[2rem] shadow-sm p-6 border border-orange-50'>
            <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4'>Shift Earnings</h3>
            <div className='flex flex-col items-center justify-center h-[120px]'>
              <span className='text-4xl font-black text-green-600 tracking-tighter'>₹{totalEarning}</span>
              <p className='text-[10px] font-bold text-gray-400 uppercase mt-2'>Target: ₹1000</p>
            </div>
          </div>
          <div className='bg-white rounded-[2rem] shadow-sm p-6 border border-orange-50'>
            <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4'>Orders Today</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={todayDeliveries}>
                <XAxis dataKey="hour" hide />
                <Tooltip 
                  cursor={{fill: '#fff9f6'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px'}}
                />
                <Bar dataKey="count" fill='#ff4d2d' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- AVAILABLE ORDERS SECTION --- */}
        {!currentOrder && (
          <div className='space-y-4'>
            <h3 className='text-xs font-black uppercase tracking-[0.3em] text-gray-400 px-2'>Orders Near You</h3>
            <div className='space-y-3'>
              {availableAssignments?.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <div className='bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex justify-between items-center group hover:border-[#ff4d2d] transition-all' key={index}>
                    <div className='flex-1 pr-4'>
                      <p className='text-[10px] font-black uppercase text-[#ff4d2d] tracking-widest'>{a?.shopName}</p>
                      <p className='text-sm font-bold text-gray-900 mt-1 line-clamp-1'>{a?.deliveryAddress.text}</p>
                      <p className='text-[10px] font-bold text-gray-400 mt-1 uppercase'>{a.items.length} Items • ₹{a.subtotal}</p>
                    </div>
                    <button 
                      className='bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all' 
                      onClick={() => acceptOrder(a.assignmentId)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              ) : (
                <div className='bg-white rounded-[2rem] p-10 text-center border border-dashed border-gray-200'>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Searching for assignments...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- CURRENT ORDER TRACKING --- */}
        {currentOrder && (
          <div className='space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <h3 className='text-xs font-black uppercase tracking-[0.3em] text-gray-400 px-2'>Active Task</h3>
            <div className='bg-white rounded-[2.5rem] p-6 shadow-xl border border-orange-50'>
              <div className='flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-3xl border border-gray-100'>
                <div className='bg-black text-white p-3 rounded-2xl'>📦</div>
                <div>
                  <p className='text-xs font-black uppercase tracking-tighter text-gray-900'>{currentOrder?.shopOrder.shop.name}</p>
                  <p className='text-[10px] font-bold text-gray-400 truncate w-[200px] uppercase tracking-tighter'>{currentOrder.deliveryAddress.text}</p>
                </div>
                <div className='ml-auto text-right'>
                  <p className='text-xs font-black text-[#ff4d2d]'>₹{currentOrder.shopOrder.subtotal}</p>
                  <p className='text-[9px] font-bold text-gray-400 uppercase'>{currentOrder.shopOrder.shopOrderItems.length} items</p>
                </div>
              </div>

              <DeliveryBoyTracking data={{ 
                deliveryBoyLocation: deliveryBoyLocation || {
                  lat: userData.location.coordinates[1],
                  lon: userData.location.coordinates[0]
                },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude
                }}} 
              />

              {!showOtpBox ? (
                <button 
                  className='mt-6 w-full bg-[#ff4d2d] text-white font-black py-4 px-4 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all flex justify-center items-center' 
                  onClick={sendOtp} 
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color='white' /> : "Complete Delivery"}
                </button>
              ) : (
                <div className='mt-6 p-6 rounded-3xl bg-gray-900 text-white space-y-4'>
                  <div>
                    <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>Verification</p>
                    <p className='text-sm font-bold'>Enter OTP from {currentOrder.user.fullName.split(' ')[0]}</p>
                  </div>
                  <input 
                    type="text" 
                    className='w-full bg-white/10 border border-white/10 px-4 py-4 rounded-2xl text-xl font-black tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] transition-all' 
                    placeholder='0000' 
                    onChange={(e) => setOtp(e.target.value)} 
                    value={otp} 
                  />
                  {message && <p className='text-center text-green-400 text-xs font-bold uppercase tracking-widest'>{message}</p>}
                  <button 
                    className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95" 
                    onClick={verifyOtp}
                  >
                    Confirm Drop-off
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

export default DeliveryBoy

