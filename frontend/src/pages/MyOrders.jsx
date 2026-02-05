import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice';

function MyOrders() {
  const { userData, myOrders, socket } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    socket?.on('newOrder', (data) => {
      if (data.shopOrders?.owner._id === userData._id) {
        dispatch(setMyOrders([data, ...myOrders]))
      }
    })

    socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId === userData._id) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }))
      }
    })

    return () => {
      socket?.off('newOrder')
      socket?.off('update-status')
    }
  }, [socket, myOrders, userData._id, dispatch])

  return (
    <div className='min-h-screen bg-white selection:bg-black selection:text-white pb-20'>
      <div className='max-w-[800px] mx-auto px-6 pt-10'>
        
        {/* --- HEADER --- */}
        <div className='flex items-center gap-6 mb-12 animate-fade-up'>
          <button 
            onClick={() => navigate("/")}
            className="p-3 rounded-full bg-[#f5f5f7] hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
          >
            <IoIosArrowRoundBack size={28} />
          </button>
          <div>
            <h1 className='text-4xl font-black tracking-tighter text-black uppercase leading-none'>
              {userData.role === "owner" ? "Shop Sales." : "My Orders."}
            </h1>
            <p className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2'>
              {myOrders?.length || 0} Total Transactions
            </p>
          </div>
        </div>

        {/* --- ORDERS LIST --- */}
        <div className='space-y-8 animate-fade-up' style={{ animationDelay: '100ms' }}>
          {myOrders && myOrders.length > 0 ? (
            myOrders.map((order, index) => (
              <div key={index} className="transition-transform duration-300 hover:scale-[1.01]">
                {userData.role === "user" ? (
                  <UserOrderCard data={order} />
                ) : userData.role === "owner" ? (
                  <OwnerOrderCard data={order} />
                ) : null}
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-32 border-2 border-dashed border-[#f5f5f7] rounded-[40px]'>
              <div className='h-16 w-16 bg-[#f5f5f7] rounded-full flex items-center justify-center mb-4'>
                <div className='h-2 w-2 bg-gray-300 rounded-full animate-ping' />
              </div>
              <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
                No orders found yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyOrders



// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import UserOrderCard from '../components/UserOrderCard';
// import OwnerOrderCard from '../components/OwnerOrderCard';
// import { setMyOrders, updateOrderStatus, updateRealtimeOrderStatus } from '../redux/userSlice';


// function MyOrders() {
//   const { userData, myOrders,socket} = useSelector(state => state.user)
//   const navigate = useNavigate()
// const dispatch=useDispatch()
//   useEffect(()=>{
// socket?.on('newOrder',(data)=>{
// if(data.shopOrders?.owner._id==userData._id){
// dispatch(setMyOrders([data,...myOrders]))
// }
// })

// socket?.on('update-status',({orderId,shopId,status,userId})=>{
// if(userId==userData._id){
//   dispatch(updateRealtimeOrderStatus({orderId,shopId,status}))
// }
// })

// return ()=>{
//   socket?.off('newOrder')
//   socket?.off('update-status')
// }
//   },[socket])



  
//   return (
//     <div className='"w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
//       <div className='w-full max-w-[800px] p-4'>

//         <div className='flex items-center gap-[20px] mb-6 '>
//           <div className=' z-[10] ' onClick={() => navigate("/")}>
//             <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
//           </div>
//           <h1 className='text-2xl font-bold  text-start'>My Orders</h1>
//         </div>
//         <div className='space-y-6'>
//           {myOrders?.map((order,index)=>(
//             userData.role=="user" ?
//             (
//               <UserOrderCard data={order} key={index}/>
//             )
//             :
//             userData.role=="owner"? (
//               <OwnerOrderCard data={order} key={index}/>
//             )
//             :
//             null
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MyOrders
