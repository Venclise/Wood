import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  Menu } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SideBar() {
  return (
   <Sheet>
  <SheetTrigger asChild>
    <Button size="icon-lg" className="rounded-full" variant="ghost">
    <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>    
             <Link href="/" className="text-[#915745] font-semibold text-2xl">
        Wood
      </Link>

        </SheetTitle>
      <SheetDescription className="flex flex-col items-start justify-start py-10 px-2 gap-3  ">
  {
      categories.map(({Catslug,title,subCategories}) => (
          
        
            <Accordion type="single" key={title} collapsible defaultValue={`item-${title}`} className='w-full bg-white text-center rounded-md'>
  <AccordionItem value="item-1" className='w-full '>
    <div className="flex items-center w-full justify-between border-b">
<Link href={`/products/${Catslug}`}>
<SheetClose className="cursor-pointer hover:underline">
{title}
</SheetClose>
</Link>
    <AccordionTrigger className='w-max cursor-pointer  '></AccordionTrigger>
    </div>
    <AccordionContent className='flex flex-col items-start justify-start gap-4 p-5'>
       {subCategories.map(({title,slug}) => (
         
         <Link
           href={`/products/${Catslug}/${slug}`}
         key={title}>
         <SheetClose  className="hover:underline cursor-pointer">
          {title}

        </SheetClose>
          </Link>
       ))}
     
    </AccordionContent>
  </AccordionItem>
</Accordion>
//           <Link href={link} className='text-lg w-full hover:bg-gray-100 rounded-md p-2 font-extralight tracking-wider  text-gray-800' key={id}>
//           <SheetClose>
// {title}
//
//       </Link>
    ))
}
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}
