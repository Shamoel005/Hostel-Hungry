import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa6"; 
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

function AddItem() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { myShopData } = useSelector(state => state.owner)
    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [category, setCategory] = useState("")
    const [foodType, setFoodType] = useState("veg")

    const categories = ["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"]

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setBackendImage(file)
            setFrontendImage(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("foodType", foodType)
            formData.append("price", price)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/item/add-item`, formData, { withCredentials: true })
            dispatch(setMyShopData(result.data))
            navigate("/")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-white selection:bg-black selection:text-white pb-20'>
            {/* --- TOP BAR --- */}
            <div className='max-w-4xl mx-auto px-6 pt-10 flex items-center justify-between'>
                <button 
                    onClick={() => navigate("/")}
                    className="p-3 rounded-full bg-[#f5f5f7] hover:bg-black hover:text-white transition-all shadow-sm"
                >
                    <IoIosArrowRoundBack size={28} />
                </button>
                <div className="text-right">
                    <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Inventory Update</span>
                    <h1 className='text-2xl font-black tracking-tighter text-black uppercase'>New Listing.</h1>
                </div>
            </div>

            <main className='max-w-xl mx-auto px-6 mt-12'>
                <form onSubmit={handleSubmit} className='space-y-10 animate-fade-up'>
                    
                    {/* IMAGE UPLOAD AREA */}
                    <div className='group relative'>
                        <div className='w-full h-64 bg-[#f5f5f7] rounded-[40px] overflow-hidden border-2 border-dashed border-gray-100 group-hover:border-black transition-all relative'>
                            {frontendImage ? (
                                <img src={frontendImage} alt="Preview" className='w-full h-full object-cover' />
                            ) : (
                                <div className='flex flex-col items-center justify-center h-full text-gray-300'>
                                    <FaCamera size={40} className="mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Product Shot</span>
                                </div>
                            )}
                            <input 
                                type="file" 
                                accept='image/*' 
                                className='absolute inset-0 opacity-0 cursor-pointer' 
                                onChange={handleImage} 
                                required
                            />
                        </div>
                        <label className='absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl'>
                            Select Image
                        </label>
                    </div>

                    {/* FORM FIELDS */}
                    <div className='space-y-6 pt-6'>
                        <div className="space-y-2">
                            <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Food Title</label>
                            <input 
                                type="text" 
                                placeholder='Enter Item Name...' 
                                className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Unit Price (₹)</label>
                                <input 
                                    type="number" 
                                    placeholder='0'
                                    className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 transition-all'
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Classification</label>
                                <select 
                                    className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 appearance-none transition-all'
                                    onChange={(e) => setFoodType(e.target.value)}
                                    value={foodType}
                                >
                                    <option value="veg">VEG</option>
                                    <option value="non veg">NON-VEG</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1'>Menu Category</label>
                            <select 
                                className='w-full rounded-[22px] bg-[#f5f5f7] px-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 appearance-none transition-all'
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                required
                            >
                                <option value="">Assign a category</option>
                                {categories.map((cate, index) => (
                                    <option value={cate} key={index}>{cate.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            type="submit"
                            className='w-full mt-4 bg-black text-white py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/10 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center'
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={18} color='white' /> : "Confirm & Add to Menu"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default AddItem
