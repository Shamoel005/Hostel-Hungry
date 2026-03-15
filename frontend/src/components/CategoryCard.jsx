import React from 'react'

function CategoryCard({ name, image, onClick }) {
  return (
    <div 
      className='w-[110px] h-[140px] md:w-[160px] md:h-[200px] rounded-[2.5rem] shrink-0 overflow-hidden bg-white shadow-sm border border-orange-50 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-1 transition-all duration-500 cursor-pointer group relative' 
      onClick={onClick}
    >
      {/* IMAGE CONTAINER */}
      <div className='w-full h-full overflow-hidden'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
        />
      </div>

      {/* OVERLAY LABEL */}
      <div className='absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-md py-3 px-2 rounded-[1.5rem] border border-white/50 shadow-sm flex items-center justify-center'>
        <span className='text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-widest text-center truncate'>
          {name}
        </span>
      </div>
    </div>
  )
}

export default CategoryCard

