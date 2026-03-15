import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user)
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const navigate = useNavigate()
  
  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [updatedItemsList, setUpdatedItemsList] = useState([])

  const handleFilterByCategory = (category) => {
    if (category === "All") {
      setUpdatedItemsList(itemsInMyCity)
    } else {
      const filteredList = itemsInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filteredList)
    }
  }

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])

  const updateButtonVisibility = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 10)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth - 10)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const cateEl = cateScrollRef.current
    const shopEl = shopScrollRef.current

    const handleCateScroll = () => updateButtonVisibility(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
    const handleShopScroll = () => updateButtonVisibility(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

    if (cateEl) {
      handleCateScroll()
      cateEl.addEventListener('scroll', handleCateScroll)
    }
    if (shopEl) {
      handleShopScroll()
      shopEl.addEventListener('scroll', handleShopScroll)
    }

    return () => {
      cateEl?.removeEventListener('scroll', handleCateScroll)
      shopEl?.removeEventListener('scroll', handleShopScroll)
    }
  }, [categories, shopInMyCity])

  return (
    <div className='w-screen min-h-screen bg-white selection:bg-black selection:text-white overflow-x-hidden'>
      <Nav />

      <main className='max-w-7xl mx-auto px-6 pb-20 space-y-16 mt-10'>
        
        {/* --- SEARCH RESULTS --- */}
        {searchItems && searchItems.length > 0 && (
          <section className='animate-fade-up'>
            <div className="mb-6">
              <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Found {searchItems.length} items</span>
              <h1 className='text-3xl font-black tracking-tighter text-black uppercase'>Search Discovery.</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {searchItems.map((item) => (
                <FoodCard data={item} key={item._id} />
              ))}
            </div>
            <hr className="mt-16 border-gray-100" />
          </section>
        )}

        {/* --- CATEGORIES SECTION --- */}
        <section className='animate-fade-up' style={{ animationDelay: '100ms' }}>
          <div className="mb-8">
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Explore Tastes</span>
            <h1 className='text-3xl font-black tracking-tighter text-black uppercase'>Inspiration.</h1>
          </div>
          
          <div className='relative group'>
            {showLeftCateButton && (
              <button className='absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-2xl z-20 hover:scale-110 transition-all border border-gray-100' onClick={() => scrollHandler(cateScrollRef, "left")}>
                <IoChevronBack size={20} />
              </button>
            )}

            <div className='flex overflow-x-auto gap-6 pb-6 scrollbar-hide' ref={cateScrollRef}>
              {categories.map((cate, index) => (
                <div key={index} className="flex-shrink-0 cursor-pointer active:scale-95 transition-transform" onClick={() => handleFilterByCategory(cate.category)}>
                  <CategoryCard name={cate.category} image={cate.image} />
                </div>
              ))}
            </div>

            {showRightCateButton && (
              <button className='absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-2xl z-20 hover:scale-110 transition-all border border-gray-100' onClick={() => scrollHandler(cateScrollRef, "right")}>
                <IoChevronForward size={20} />
              </button>
            )}
          </div>
        </section>

        {/* --- SHOPS SECTION --- */}
        <section className='animate-fade-up' style={{ animationDelay: '200ms' }}>
          <div className="mb-8">
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Local Favorites</span>
            <h1 className='text-3xl font-black tracking-tighter text-black uppercase'>Top in {currentCity}.</h1>
          </div>

          <div className='relative'>
            {showLeftShopButton && (
              <button className='absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-2xl z-20 border border-gray-100' onClick={() => scrollHandler(shopScrollRef, "left")}>
                <IoChevronBack size={20} />
              </button>
            )}

            <div className='flex overflow-x-auto gap-8 pb-6 scrollbar-hide' ref={shopScrollRef}>
              {shopInMyCity?.map((shop, index) => (
                <div key={index} className="flex-shrink-0 w-64 cursor-pointer group" onClick={() => navigate(`/shop/${shop._id}`)}>
                  <div className="relative h-40 w-full overflow-hidden rounded-[32px] mb-4">
                    <img src={shop.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={shop.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-4 left-6 text-white font-black uppercase tracking-widest text-[12px]">{shop.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {showRightShopButton && (
              <button className='absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-2xl z-20 border border-gray-100' onClick={() => scrollHandler(shopScrollRef, "right")}>
                <IoChevronForward size={20} />
              </button>
            )}
          </div>
        </section>

        {/* --- FOOD ITEMS GRID --- */}
        <section className='animate-fade-up pt-10' style={{ animationDelay: '300ms' }}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block'>Curated for you</span>
              <h1 className='text-3xl font-black tracking-tighter text-black uppercase'>Suggested.</h1>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12'>
            {updatedItemsList?.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default UserDashboard


