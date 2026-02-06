"use client";

import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import { categories } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Category() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full px-3 lg:px-10 py-6">

<h1 className="text-4xl py-5 font-semibold">
    Shop by Rooms
</h1>

      <Swiper
        modules={[A11y, Pagination]}
        spaceBetween={12}
        speed={600}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1.4,
          },
          640: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {categories.map((item) => (
          <SwiperSlide key={item.title} className="cursor-pointer">
            <div
              onClick={() => router.push(`/products/${item.Catslug}`)}
              className="
                relative 
                h-[70vh] 
                md:h-[80vh] 
                lg:h-[100vh]
                
              "
            >
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover "
                  priority={false}
                />
              )}

              
              <div className="absolute  transition" />

              {/* Text */}
              <div className="absolute bottom-5 left-5 z-10">
                <h1 className="text-white text-3xl md:text-3xl lg:text-4xl  capitalize">
                  {item.title}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
