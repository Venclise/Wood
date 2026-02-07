"use client"

import Image from 'next/image'
import { Button } from '../ui/button'

import { toast } from 'sonner';

import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useCartStore } from '../cart/cartHook';
import Counter from '../cart/counter';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';




type Product = {
  _id: any,
  title: string,
  description: string,
  price: number,
  cutprice: number,
  image: string[] , 
  category: string,
  subcategory: string
}
export default  function SingleProduct({ product }: { product: Product }) {
      const addToCart = useCartStore(state => state.addToCart)
    const clearCart = useCartStore((s) => s.clearCart);
    const router = useRouter()
    const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  
    const handleBuyNow = () => {
      clearCart( )
         addToCart({
                               id: product._id,
                               title: product.title,
                               price: product.price,
                               img: product.image[0]
                        })

    

   
    router.push("/checkout");
    }



    
    return (
  <div className="w-full   h-max  flex  justify-between  flex-col lg:flex-row lg:p-10 overflow-hidden">
        
     {product.image && (
        <div className='w-full md:w-[50%] lg:w-[50%]  flex  flex-col lg:flex-row-reverse gap-1 '>

         <div className="w-full h-[30rem] lg:w-[100%] lg:h-[35rem] relative overflow-hidden ">
          <Swiper
     className='w-full h-full'
      modules={[Navigation,Pagination]}
      spaceBetween={5}
      slidesPerView={1}
     
       onSwiper={(swiper) =>{ (swiperRef.current = swiper) ;}}
          onSlideChange={(swiper) => {setActiveIndex(swiper.activeIndex);}}
          
    >
  
    
  
  {product.image.map((img, i) => (
    <SwiperSlide key={i} className="w-full h-full flex items-center justify-center">
      <Badge className='bg-black absolute right-3 top-3 rounded-full text-xs font-light'>{i + 1}/{product.image.length}</Badge>
  <img src={img} className="w-full h-full object-cover  max-w-full max-h-full" />
</SwiperSlide>

  ))}
  </Swiper>
          </div>

{product.image.length > 1 && (

    <div className='flex items-start justify-start w-full py-5 px-3 lg:p-0 lg:w-max h-full  flex-row lg:flex-col  gap-4 '>
   {product.image.map((img, i) => (
       <div
    key={i}
    className="w-[5rem] h-[5rem] lg:h-[7rem]   relative cursor-pointer overflow-hidden transition-all"
  >
    <Image
      src={img}
      onClick={() => {
        swiperRef.current?.slideTo(i)}}
      alt={`${product.title}-${i}`}
      fill
      className={`object-cover   ${activeIndex === i ? "border-2 border-blue-300 opacity-100  scale-105" : "opacity-60 hover:opacity-100  "}` }
    />
  </div>
))}

</div>
)}

              </div>
        )}


        
<div className="flex  justify-center gap-1 flex-col p-5 flex-1  ">
   

        <h2 className="text-3xl lg:text-5xl font-light   ">
          {product.title}
        </h2>
    
    <div className='flex items-center gap-4 mt-8'>
        <p className="font-mono text-2xl">
          Rs.{product.price.toLocaleString()}
        </p>

     
       
        {
 product.cutprice > product.price && (
  <sup className="font-mono text-lg line-through text-neutral-400">
          Rs.{product.cutprice.toLocaleString()}
        </sup>
          )
        }

          
        { product.cutprice > product.price &&  (
          <Badge className=" text-sm font-mono rounded-full text-green-700  bg-transparent ">
   {Math.round(((product.cutprice - product.price) / product.cutprice) * 100)}% off
          </Badge>
        )}
    </div>

      


        <div className="flex flex-col items-center  gap-6 mt-6 w-full ">
        
        <Counter
  id={product._id}
  title={product.title}
  price={product.price}
  img={product.image[0]}
/>  
<div className='flex items-center w-full flex-col justify-center gap-4 '>

          <Button
            variant="default" 
            className="px-9 py-5 w-full text-sm text-white bg-[#915745] cursor-pointer hover:bg-[#784333]  rounded-xs  "
            onClick={() => {addToCart({
              id: product._id,
              title: product.title, 
              price: product.price,
              img: product.image[0]
            }), toast.success("Successfully added to cart") }}
            > 
            Add to cart
          </Button>
               <Button
             variant="outline"
                    className="px-9 text-sm flex items-center py-5 rounded-xs w-full   text-black   font-mono cursor-pointer  "
            > 
            <MessageCircle />
            Ask a Question on whatsapp
          </Button>
            </div>

            <Accordion type="single" collapsible className='w-full bg-white text-center rounded-md'>
  <AccordionItem value="item-1" className='w-full '>
    <AccordionTrigger className=' w-full cursor-pointer border-b p-3 hover:underline-0 text-md tracking-wide flex items-center text-center'>Description</AccordionTrigger>
    <AccordionContent className='p-5'>
       <p className="text-gray-600 text-xs tracking-wide text-left"> 
          {product.description}
        </p>
     
    </AccordionContent>
  </AccordionItem>
</Accordion>
         

</div>

        </div> 

     
     
       
    </div>
  )
}
