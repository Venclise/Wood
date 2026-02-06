import ProductCard from "@/components/products/ProductCard";
import { notFound } from "next/navigation";

const slugToCategory = (slug: string) => {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
};

export default async function Page({
  params,
}: {
  params: { category?: string };
}) {
  const { category } = await params;

  if (!category) {
    notFound();
  }

  const formattedCategory = slugToCategory(category);

  const query = new URLSearchParams();
  query.set("category", formattedCategory);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/products?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p>Failed to fetch products</p>;
  }

  const data = await res.json();

  return (
    <div className="mt-12 p-5 lg:p-10">
      <h1 className="text-xl lg:text-4xl mt-12 p-5">
        Shop {" "}
        {formattedCategory}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 gap-y-30 md:gap-y-23 w-full py-10">
        {data.map((product: any) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
