"use client"

import { Heart, LogOut, Menu, Router, Search, Truck, User, User2 } from 'lucide-react'
import Link from 'next/link'

import { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SideBar from './SideBar'
import Cart from './cart/cart'
import SearchInput from './SearchInput'
import { toast } from 'sonner'
import { usePathname, useRouter } from 'next/navigation'
import ProductCard from './products/ProductCard'
import { useUserStore } from './cart/cartHook'

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};



export default function Header() {
 
const { setUser } = useUserStore();

const user = useUserStore((state) => state.user);

    const path = usePathname()
const router = useRouter()
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { 
          cache: "no-store", 
          credentials: "include"
        })
        const data = await res.json()
        if (res.ok && data.user) {
          setUser(data.user)

        } else {
          setUser(null)
        }
      } catch (err) {
        console.error(err)
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  const handleDeleteUser = async() => {
    const res = await fetch('/api/me/', {
      method: "DELETE",
    })

    if (!res.ok) {
      toast.error("Failed to delete product")
      return
    }
    toast.success("Successfully Logged out ")
    router.refresh()
    
  }
  

  return (
    <div className={`w-full h-[3rem] flex items-center justify-between p-8 ${path === "/sign-up" || path === "/login" ? "hidden"  : "flex"  }`}>
      <div className='flex items-center gap-2'>
        <SideBar />
        
       <SearchInput />
      </div>

      <Link href="/" className="text-[#915745] font-semibold text-center text-2xl">
        Wood
      </Link>

      <div className='flex items-center gap-2'>
        {user?.name ? ( 
  
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
       <Button className='bg-[#915745] cursor-pointer hover:bg-[#724234] rounded-full text-sm ' size="icon-lg">
           
          
              <span className='flex'>{user.name[0]}</span> 
              
            
          </Button> 
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuItem className='cursor-pointer'>
        <User2 />
        My Account</DropdownMenuItem>
      <DropdownMenuItem className='cursor-pointer'>
        <Truck />
        Track Order</DropdownMenuItem>
      <DropdownMenuItem className='cursor-pointer'>
        <Heart />
        Wishlist</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant='destructive' onClick={handleDeleteUser} className='cursor-pointer '> <LogOut  /> Log out</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
        ) : (
        <>
          <Button className='bg-[#915745] cursor-pointer hover:bg-[#724234] rounded-full text-sm hidden lg:flex'>
            <Link href="/sign-up" className='flex items-center gap-2 w-full h-full'>
              <User strokeWidth={1.5}/>
              <span className='hidden lg:flex'>Sign up</span>
            </Link>
          </Button>
           <Button size="icon-lg" className='bg-[#915745] cursor-pointer hover:bg-[#724234] rounded-full text-sm flex items-center justify-center lg:hidden'>
            <Link href="/sign-up" className='flex items-center justify-center gap-2 w-full h-full'>
              <User strokeWidth={1.5}/>
        
            </Link>
          </Button>
        </>
        )} 
<Cart />
      </div>

      
    </div>
  )
}
