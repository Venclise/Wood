import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productid: string }> }
) {
  try {
    await connectDB();

    const { productid } = await params
    const product = await Product.findById(productid);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET Product error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productid: string }> }
) {
  try {
    await connectDB();

    const { productid } = await params;
    const body = await req.json();
    const { title, price, description, category, cutprice } = body;

    if (!title || !price || !description || !category || !cutprice) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productid,
      { title, price, description, category, cutprice },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("PATCH Product error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productid: string }> }
) {
  try {
    await connectDB();

    const { productid  } = await params;
    const deletedProduct = await Product.findByIdAndDelete(productid);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Product error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


export async function FIND(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    await connectDB();
    
    
   }catch(error) {

   } 
}