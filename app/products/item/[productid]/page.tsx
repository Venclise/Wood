import RecommendProducts from "@/components/products/RecommendProducts"
import SingleProduct from "@/components/products/SingleProduct"

export default async function Page({
  params, 
}: {
  params: Promise<{ productid: string }>
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const { productid } =await params

  const res = await fetch(
    `${baseUrl}/api/products/${productid}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch product")
  }

  const product = await res.json()

  const recommendRes = await fetch(
    `${baseUrl}/api/products/related?category=${product.category}&productId=${product._id}`,
    { cache: "no-store" }
  )

  if (!recommendRes.ok) {
    return (
      <div className="w-full h-screen flex items-center text-sm justify-center">
        <p>An error occured. Please check your internet connection.</p>
      </div>
    )
  }

  const data = await recommendRes.json()

  return (
    <div>
      <SingleProduct product={product} />
      {data.length > 0 && <RecommendProducts data={data} />}
    </div>
  )
}
