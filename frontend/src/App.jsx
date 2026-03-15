import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import CreateEditShop from './pages/CreateEditShop'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import OrderPlaced from './pages/OrderPlaced'
import MyOrders from './pages/MyOrders'
import TrackOrderPage from './pages/TrackOrderPage'
import Shop from './pages/Shop'
import VerifyEmail from './pages/VerifyEmail' 

import useGetCurrentUser from './hooks/useGetCurrentUser'
import useGetCity from './hooks/useGetCity'
import useGetMyshop from './hooks/useGetMyShop'
import useGetShopByCity from './hooks/useGetShopByCity'
import useGetItemsByCity from './hooks/useGetItemsByCity'
import useGetMyOrders from './hooks/useGetMyOrders'
import useUpdateLocation from './hooks/useUpdateLocation'

import { setSocket } from './redux/userSlice'

export const serverUrl = "https://hostel-hungry.onrender.com"

function App() {
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useGetCurrentUser()
  useUpdateLocation()
  useGetCity()
  useGetMyshop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()

  useEffect(() => {
    if (!userData?._id) return

    const socketInstance = io(serverUrl, {
      withCredentials: true,
      transports: ["websocket"],
    })

    dispatch(setSocket(socketInstance))

    socketInstance.on("connect", () => {
      socketInstance.emit("identity", {
        userId: userData._id,
      })
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [userData?._id]) // Optimized dependency

  return (
    <Routes>
      {/* ROOT REDIRECT: Landing Page Removed */}
      <Route 
        path='/' 
        element={userData ? <Navigate to="/home" /> : <Navigate to="/signin" />} 
      />

      {/* AUTH ROUTES */}
      <Route
        path='/signin'
        element={!userData ? <SignIn /> : <Navigate to="/home" />}
      />
      <Route
        path='/signup'
        element={!userData ? <SignUp /> : <Navigate to="/home" />}
      />
      <Route
        path='/forgot-password'
        element={!userData ? <ForgotPassword /> : <Navigate to="/home" />}
      />
      <Route path='/verify-email' element={<VerifyEmail />} />

      {/* PROTECTED ROUTES */}
      <Route
        path='/home'
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
      <Route
        path='/create-edit-shop'
        element={userData ? <CreateEditShop /> : <Navigate to="/signin" />}
      />
      <Route
        path='/add-item'
        element={userData ? <AddItem /> : <Navigate to="/signin" />}
      />
      <Route
        path='/edit-item/:itemId'
        element={userData ? <EditItem /> : <Navigate to="/signin" />}
      />
      <Route
        path='/cart'
        element={userData ? <CartPage /> : <Navigate to="/signin" />}
      />
      <Route
        path='/checkout'
        element={userData ? <CheckOut /> : <Navigate to="/signin" />}
      />
      <Route
        path='/order-placed'
        element={userData ? <OrderPlaced /> : <Navigate to="/signin" />}
      />
      <Route
        path='/my-orders'
        element={userData ? <MyOrders /> : <Navigate to="/signin" />}
      />
      <Route
        path='/track-order/:orderId'
        element={userData ? <TrackOrderPage /> : <Navigate to="/signin" />}
      />
      <Route
        path='/shop/:shopId'
        element={userData ? <Shop /> : <Navigate to="/signin" />}
      />
    </Routes>
  )
}

export default App

