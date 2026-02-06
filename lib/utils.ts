import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const slugToCategory = (slug: string) => {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase())
}


const slugToText = (slug: string) =>
  slug
    .split("-")          // ["side", "table"]
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");          // "Side Table"


  export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")        // remove quotes
    .replace(/\s+/g, "-")        // spaces → -
    .replace(/&/g, "and")        // & → and
    .replace(/[^a-z0-9-]/g, ""); // remove junk
const deslugify = (slug: string) =>
  slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
