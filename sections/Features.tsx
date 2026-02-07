import { GlassWater, Layers, Leaf, Pencil, Waves } from 'lucide-react'
import React from 'react'

export default function Features() {
  return (
    <div className='h-max bg-gray-50 p-5 lg:p-10 flex items-center gap-12 justify-around flex-wrap'>
      <div className='flex items-center gap-4 '>
          <Layers className='w-5 h-5 lg:w-10 lg:h-10' />
          <div className='flex flex-col'>
          <div className='text-gray-400 text-xs lg:text-sm'>
            Materials
          </div>
          <h1>Premium Fabric</h1>
          </div>
      </div>
        <div className='flex items-center gap-4 '>
          <Pencil className='w-5 h-5 lg:w-10 lg:h-10'/> 
          <div className='flex flex-col'>
          <div  className='text-gray-400 text-xs lg:text-sm'>
    
Design  
          </div>
          <h1>Sophisticated Design</h1>
          </div>
      </div>
        <div className='flex items-center gap-4 '>
          <Waves className='w-5 h-5 lg:w-10 lg:h-10' />
          <div className='flex flex-col'>
          <div className='text-gray-400 text-xs lg:text-sm'>
            
Wipe & Wash
          </div>
          <h1>Easy to Clean</h1>
          </div>
      </div>
        <div className='flex items-center gap-4 '>
          <Leaf className='w-5 h-5 lg:w-10 lg:h-10' />
          <div className='flex flex-col'>
          <div  className='text-gray-400 text-xs lg:text-sm'>
            Quality
          </div>
          <h1>Solid Wood Structure</h1>
          </div>
      </div>
    </div>
  )
}
