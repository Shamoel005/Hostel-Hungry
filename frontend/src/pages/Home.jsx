import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliveryBoy from '../components/DeliveryBoy'

function Home() {
    const { userData } = useSelector(state => state.user)

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white'>
            {/* Main container with a slight top padding to clear your fixed Navbar.
                Using animate-fade-up to ensure the dashboard "pops" in elegantly.
            */}
            <main className='max-w-[1440px] mx-auto pt-24 lg:pt-32 px-4 sm:px-6 lg:px-10 animate-fade-up'>
                
                {/* ROLE-BASED DASHBOARD RENDERING */}
                <div className="w-full">
                    {userData.role === "user" && (
                        <div className="space-y-8">
                             {/* You can add a personalized greeting here if desired */}
                             <header className="mb-10">
                                <span className='text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 block mb-2'>Student Workspace</span>
                                <h1 className='text-4xl lg:text-6xl font-black tracking-tighter text-black uppercase'>
                                    Hungry, {userData.fullName?.split(' ')[0]}.?
                                </h1>
                             </header>
                             <UserDashboard />
                        </div>
                    )}

                    {userData.role === "owner" && (
                        <div className="space-y-8">
                             <header className="mb-10">
                                <span className='text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-2'>Merchant Console</span>
                                <h1 className='text-4xl lg:text-6xl font-black tracking-tighter text-black uppercase'>
                                    Store Overview.
                                </h1>
                             </header>
                             <OwnerDashboard />
                        </div>
                    )}

                    {userData.role === "deliveryBoy" && (
                        <div className="space-y-8">
                            <header className="mb-10">
                                <span className='text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-2'>Rider Command</span>
                                <h1 className='text-4xl lg:text-6xl font-black tracking-tighter text-black uppercase'>
                                    Active Shifts.
                                </h1>
                             </header>
                             <DeliveryBoy />
                        </div>
                    )}
                </div>
            </main>

            {/* Subtle Brand Watermark for authenticated home */}
            <div className='fixed bottom-8 right-8 opacity-5 pointer-events-none hidden lg:block'>
                <div className='flex flex-col leading-[0.85] text-right'>
                    <span className='font-black text-4xl tracking-tighter text-black'>HOSTEL</span>
                    <span className='text-[12px] font-bold text-black tracking-[0.4em] uppercase'>HUNGRY</span>
                </div>
            </div>
        </div>
    )
}

export default Home



// import React from 'react'
// import { useSelector } from 'react-redux'
// import UserDashboard from '../components/UserDashboard'
// import OwnerDashboard from '../components/OwnerDashboard'
// import DeliveryBoy from '../components/DeliveryBoy'

// function Home() {
//     const {userData}=useSelector(state=>state.user)
//   return (
//     <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
//       {userData.role=="user" && <UserDashboard/>}
//       {userData.role=="owner" && <OwnerDashboard/>}
//       {userData.role=="deliveryBoy" && <DeliveryBoy/>}
//     </div>
//   )
// }

// export default Home
