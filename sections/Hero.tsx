import BounceCards from '@/components/BounceCards';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/constants';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Hero() {

  
  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];
  return (
    

    <div className='p-2 gap-1  h-screen w-full transition-all flex flex-col items-center justify-center overflow-hidden   '>

<h1 className='text-[#915745] text-7xl lg:text-9xl font-bold'>
   New 
 
    in.

</h1>

<BounceCards
  className="custom-bounceCards"
  images={images}
  containerWidth={500}
  containerHeight={250}
  animationDelay={1}
  animationStagger={0.08}
  easeType="elastic.out(1, 0.5)"
  transformStyles={transformStyles}
  enableHover


/>

<div className='flex items-center gap-4'>
  <Link href="/products?sort=newest" >
  <Button className='rounded-full text-xs lg:text-md p-5  bg-[#915745] cursor-pointer hover:bg-[#784333]'>
        Shop new in
  </Button>
  </Link>
<Link href="/products">
     <Button className='rounded-full text-xs p-5 underline cursor-pointer text-[#915745] hover:text-[#915745] lg:text-md' variant="ghost">
       Shop All
  </Button>
  </Link>
</div>

      
    </div>
  )
}
