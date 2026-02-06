"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sort = searchParams.get("sort");
  const sale = searchParams.get("sale");

  const [products, setProducts] = useState<any[]>([]);
 

  useEffect(() => {
    async function fetchProducts() {
    

      const params = new URLSearchParams();

      if (sort) params.set("sort", sort);
      if (sale) params.set("sale", "true");

      const url = `/api/products${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      setProducts(data);
   
    }

    fetchProducts();
  }, [sort, sale]); 



  return (
    <div className="mt-12 p-5 lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-4xl">
          Shop {sort === "newest" && "New in"} {sale && "On Sale"}
        </h1>

        <Select
          value={sort || ""}
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === "newest") {
              params.set("sort", "newest");
              params.delete("sale");
            }

            if (value === "sale") {
              params.set("sale", "true");
              params.delete("sort");
            }

            router.push(`/products?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="sale">On Sale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-20 py-10">
        {products.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
