import Image from 'next/image'
import React from 'react'

export default function Rules() {
  return (
    <div className='w-full h-max lg:h-screen gap-5 lg:gap-2 p-5 lg:p-10 flex items-center flex-col lg:flex-row'>
        <span className='text-3xl text-center'>
            Rules for choosing furniture
        </span>
        <div className='w-full lg:w-[50%] relative h-[20rem] lg:h-screen'>
            <Image src="/chair.jpg" alt="Sofa chair" fill className='w-full h-full object-cover' />

        </div>
        <div className='flex flex-col w-full lg:w-[50%] gap-4'>
            <h1 className="text-xl text-center">Whether living on your own or with a family, your living room is an important space.</h1>
            <p className='text-sm'>This room is where your family spends time together, and it is the room most of your guests will spend the majority of their time in. Choosing furniture that creates a pleasant, welcoming appearance while holding up against the wear and tear of everyday life is the key in getting this space to work for your needs.


At Wood , every piece is designed and built in our own factory.

We work with skilled hands. Sourcing responsibly and crafting with care, so every item reflects true  craftsmanship.

Built with purpose, made to last. Designed around how you live.</p>
        </div>
    </div>
  )
}
