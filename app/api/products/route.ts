import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";
import cloudinary from "@/lib/cloudinary";
import mongoose from "mongoose";


 export const dynamic = "force-dynamic";



export async function GET(req: NextRequest) {


  
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory")
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const sale = searchParams.get("sale"); 

    const query: any = {};

if (category && category !== "all") {
  
  query.category = { $regex: `^${category}$`, $options: "i" }
}

if(subcategory) {
  query.subcategory = {$regex: `^${subcategory}$`,$options: "i"}
}

    if (search) query.title = { $regex: search, $options: "i" };

   
    if (sale === "true") {
      query.$expr = { $gt: ["$cutprice", "$price"] };
    }

    let mongooseQuery = Product.find(query);

    if (sort === "newest") {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }

    if (limit) {
      mongooseQuery = mongooseQuery.limit(Number(limit));
    }

    const products = await mongooseQuery.lean();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const cutprice = Number(formData.get("cutprice"));
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;

    const files = formData.getAll("images").filter((f): f is File => f instanceof File);

    if (!title || !description || isNaN(price)  || !category || files.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }).end(buffer);
      });
      imageUrls.push(result.secure_url);
    }

    const product = await Product.create({ title, description, price, cutprice, category, image: imageUrls,subcategory });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
