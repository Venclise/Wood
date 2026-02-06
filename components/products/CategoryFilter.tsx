

"use client"
import {A11y,Pagination,Navigation} from 'swiper/modules';

import { Swiper, SwiperSlide, } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { categories, FURNITURE_ITEMS } from '@/lib/constants'
import { Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import type { Swiper as SwiperType } from "swiper";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function 
() {

  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const activeCategory = searchParams?.get("category") ?? "all"

  

  const handleChange = (category:string) => {
      router.push(`/products?category=${category}`)
  }
  

return (
 <div className='flex items-center justify-center w-full  gap-4 p-10 lg:gap-8 w-full '>


       

      <Link  href="/products" className='  flex items-center justify-center py-2 flex-col h-[5rem] w-[5rem] group transition-all cursor-pointer' >
              
              


  <Tag className='w-10 h-10  text-black  group-hover:scale-105 transition-transform'/>


                
              
              <span className='text-xs font-light  text-gray-700 max-w-lg'>
                All
              </span>
              </Link>
            
        {
          FURNITURE_ITEMS.map(({title,icon:Icon,img}) => {
            return (


              <div  key={title} className='  flex items-center justify-center py-2 flex-col h-[5rem] w-[5rem] group transition-all cursor-pointer' onClick={() => handleChange(title)}>
              
                {
Icon ? (

  <Icon className='w-10 h-10  text-black  group-hover:scale-105 transition-transform'/>
): <div>
     <Image src={img} alt={title} height="20" width="40" className='w-full   transition-transform group-hover:scale-105 h-full object-contain'/>
</div>
                }
              
              <span className='text-xs font-light  text-gray-700 max-w-lg'>
                {title}
              </span>
              </div>
            
             )
            })
          }
      
  </div>
           
  
  )
}
