import React from 'react'
import scooter from "../assets/scooter.png"
import home from "../assets/home.png"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'

const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

function DeliveryBoyTracking({ data }) {

    const deliveryBoyLat = data.deliveryBoyLocation.lat
    const deliveryBoylon = data.deliveryBoyLocation.lon
    const customerLat = data.customerLocation.lat
    const customerlon = data.customerLocation.lon

    const path = [
        [deliveryBoyLat, deliveryBoylon],
        [customerLat, customerlon]
    ]

    const center = [deliveryBoyLat, deliveryBoylon]

    return (
        <div className='w-full h-[400px] mt-6 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-100 border-4 border-white relative group'>
            {/* Minimal Status Badge Overlay */}
            <div className='absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-orange-50 shadow-sm'>
                <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-[10px] font-black uppercase tracking-widest text-gray-700'>Live Tracking</span>
                </div>
            </div>

            <MapContainer
                className={"w-full h-full"}
                center={center}
                zoom={16}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <Marker position={[deliveryBoyLat, deliveryBoylon]} icon={deliveryBoyIcon}>
                    <Popup>
                        <div className='font-bold text-[#ff4d2d]'>Delivery Partner</div>
                    </Popup>
                </Marker>

                <Marker position={[customerLat, customerlon]} icon={customerIcon}>
                    <Popup>
                        <div className='font-bold text-gray-800'>Delivery Destination</div>
                    </Popup>
                </Marker>

                <Polyline 
                    positions={path} 
                    color='#ff4d2d' 
                    weight={5} 
                    opacity={0.6}
                    dashArray="10, 10" // Makes the line dashed for a modern "route" look
                />
            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking

// import React from 'react'
// import scooter from "../assets/scooter.png"
// import home from "../assets/home.png"
// import "leaflet/dist/leaflet.css"
// import L from "leaflet"
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
// const deliveryBoyIcon = new L.Icon({
//     iconUrl: scooter,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40]
// })
// const customerIcon = new L.Icon({
//     iconUrl: home,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40]
// })
// function DeliveryBoyTracking({ data }) {

//     const deliveryBoyLat = data.deliveryBoyLocation.lat
//     const deliveryBoylon = data.deliveryBoyLocation.lon
//     const customerLat = data.customerLocation.lat
//     const customerlon = data.customerLocation.lon

//     const path = [
//         [deliveryBoyLat, deliveryBoylon],
//         [customerLat, customerlon]
//     ]

//     const center = [deliveryBoyLat, deliveryBoylon]

//     return (
//         <div className='w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md'>
//             <MapContainer
//                 className={"w-full h-full"}
//                 center={center}
//                 zoom={16}
//             >
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//              <Marker position={[deliveryBoyLat,deliveryBoylon]} icon={deliveryBoyIcon}>
//              <Popup>Delivery Boy</Popup>
//              </Marker>
//               <Marker position={[customerLat,customerlon]} icon={customerIcon}>
//              <Popup>Delivery Boy</Popup>
//              </Marker>


// <Polyline positions={path} color='blue' weight={4}/>

//             </MapContainer>
//         </div>
//     )
// }

// export default DeliveryBoyTracking
