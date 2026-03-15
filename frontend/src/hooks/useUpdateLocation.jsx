import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useSelector } from 'react-redux'

function useUpdateLocation() {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        // 1. Only start watching if we have a logged-in user
        if (!userData) return;

        const updateLocation = async (lat, lon) => {
            try {
                const result = await axios.post(
                    `${serverUrl}/api/user/update-location`,
                    { lat, lon }, // Backend expects 'lon'
                    { withCredentials: true }
                )
                // console.log("Location updated:", result.data)
            } catch (error) {
                // If the user isn't logged in, the backend returns 401/400
                console.error("Location update failed:", error.response?.data?.message)
            }
        }

        // 2. Start watching position
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                updateLocation(pos.coords.latitude, pos.coords.longitude)
            },
            (err) => console.error("Geolocation error:", err.message),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        // 3. Cleanup: Stop watching when the component unmounts or user logs out
        return () => navigator.geolocation.clearWatch(watchId);

    }, [userData?._id]); // Only re-run if the User ID actually changes
}

export default useUpdateLocation
