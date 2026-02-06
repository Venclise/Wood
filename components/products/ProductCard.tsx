"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { usePathname } from "next/navigation"
import ProductActions from "../dashboard/ProductActions"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUserStore } from "../cart/cartHook"
import { toast } from "sonner"

type ProductData = {
  _id: string
  title: string
  price: number
  cutprice: number
  description: string
  category: string
  image: string[]
  sold: number
}



export default function ProductCard({ data }: { data: ProductData }) {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  

    

  

  return (
    
    <div 
          className="h-[22rem]  group  relative"
    >

    <Link
      href={`${isDashboard ? "#" : `/products/item/${data._id}`}`}
      className="h-full w-full "

    >

   
      <div className="h-[90%] w-full relative overflow-hidden">
      
        <Image
          src={data.image[0]}
          alt={data.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            !isDashboard && data.image.length > 1
              ? "group-hover:opacity-0"
              : ""
          }`}
        />

      
        {!isDashboard && data.image.length > 1 && (
          <Image
            src={data.image[1]}
            alt={data.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        
        {!isDashboard &&  data.cutprice > data.price &&  (
          <Badge className="absolute text-xs top-3 left-3 rounded-full bg-green-100  text-green-700 uppercase">
         
  Save {Math.round(((data.cutprice - data.price) / data.cutprice) * 100)}%
          </Badge>
        )}

            
        {isDashboard && (
          <Badge className="absolute text-xs top-3 left-3 rounded-xs bg-green-100 text-black uppercase">
            {data.sold}
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 px-5 mt-4">
      

        {
          isDashboard && (
            <ProductActions id={data._id}/>
          )
        }
        
        <h2 className="text-lg  md:text-xl  text-center line-clamp-2">{data.title}</h2>


        <div className="flex items-center gap-2">
          <p className="text-xs  flex items-center ">
            <span className="font-semibold text-sm">Rs.</span>
            {data.price.toLocaleString()}
          </p>

          <div className="flex items-center gap-1">
            {
data.cutprice > data.price && (  
  <>
<sup className="font-mono text-xs  line-through text-neutral-400">
          Rs.{data.cutprice.toLocaleString()}
        </sup>
  </>
          )
            }
          </div>
        </div>
      </div>
    </Link>
    </div>

  )
}
