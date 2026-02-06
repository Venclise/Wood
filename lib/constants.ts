import { Armchair, Cable, Gamepad2,Keyboard,Mouse,  BedDouble,
  Lamp,
  Table2,
  Sofa,
  Tv,
  ForkKnife,
  Bath,
  Baby,
 } from "lucide-react";
import { slugify } from "./utils";




export const categories = [

  {
    title: "Bedroom",
    Catslug: "bedroom",
    img: "/bedroom.webp",
    subCategories: [
      { title: "Single Bed", slug: "single-bed" },
      { title: "Double Bed", slug: "double-bed" },
      { title: "Side Table", slug: "side-table" },
    ],
  },
  {
    title: "Living Room",
    Catslug: "living-room",
    img: "/sofa.webp",
    subCategories: [
      { title: "Sofa", slug: "sofa" },
      { title: "Chair", slug: "chair" },
      { title: "Coffee Table", slug: "coffee-table" },
    ],
  },


  {
    title: "Kids",
    Catslug: "kids",
    img: "/kids-1.jpg",
    subCategories: [
         { title: "Bed", slug: "bed" },
      { title: "Study Desk", slug: "study-desk" },
      { title: "Chair", slug: "chair" },
      { title: "Toy Storage", slug: "toy-storage"},
    ],
  },

  {
    title: "Office Furniture",
    Catslug: "office-furniture",
    img: "/office-1.jpg",

    subCategories: [
      { title: "Office Chair", slug:"office-Chair" },
        { title: "Study Desk", slug: "study-desk" },
      { title: "Bookshelf", slug: "bookshelf" },
      { title: "Filing Cabinet", slug: "filing-Cabinet" },
    ],
  },

  {
    title: "Outdoor",
    Catslug: "outdoor",
    img: "/outdoor.webp",

    subCategories: [
      { title: "bench", slug: "bench" },
      { title: "outdoor-chair", sglug: "outdoor-chair" },
      { title: "arden-table", slug: "garden-table" },
    ],
  },
];


export const links = [
     {
        id: 1,
        title:"Keyboard",
        link: "#"
     },
       {
        id: 5,
        title:"Mouse",
        link: "#"
     },
       {
        id: 2,
        title:"Keycaps",
        link: "#"
     },
       {
        id: 3,
        title:"Controllers",
        link: "#"
     },
       {
        id: 4,
        title:"Mats",
        link: "#"
     },
]



export const Brands = [
   {
      id: 1,
      title: "ducky",
      img: "/ducky-logo.webp"
   },
   {
           id: 2,
      title: "endgame",
      img: "/Endgame-Gear.webp"
   },
     {
           id: 3,
      title: "evo",
      img: "/evo.avif"
   },
     {
           id: 4,
      title: "keychron",
      img: "/keychron.webp"
   },
     {
           id: 5,
      title: "realforce",
      img: "/realforce.avif"
   },
     {
           id: 6,
      title: "varmilo",
      img: "/varmilo_logo.avif"
   },
     {
           id: 7,
      title: "wlm",
      img: "/wlm.webp"
   },
     {
           id: 8,
      title: "wobkey",
      img: "/wobkey.webp"
   },
]






export interface SubCategory {
 
  title: string;
  link:string,
}
export interface Category {
  id: string;
  title: string;
  link: string;
  img: string;
  subCategories: SubCategory[];
}





export const catFilter = [
   {
      id: "all",
      title: "all"
   },
   {
        
    id: "keyboard",
    title: "Keyboard",
   },
  {
    id: "keycaps",
    title: "Keycaps",
},
     {
    id: "mouse",
    title: "Mouse",
},
   {
          id: "mousepad",
    title: "Mousepad",
   },
   {
       id: "console-controller",
    title: "Console Controller",
   },
]


export  const images = [
   "/bed-white.jpg",
    "/chair.jpg",
   "/sofa.jpg",
   "/side-table.png",
   "/lamp.avif", 
  ];



export const FURNITURE_ITEMS = [
  {
    title: "Bed",
    icon: BedDouble,
  },
  {
    title: "Sofa",
    icon: Sofa,
  },
  {
    title: "Table",
    img: "/table.png",
  },
  {
    title: "Side Table",
    img: "/side-table-icon.png",
  },
  {
    title: "Chairs",
    img: "/chair.png" 
  }
];
