import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import users from "@/models/users";

export async function GET() {
  try {
    await connectDB();
    const c = await cookies(); 
const token = c.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await users.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}


export  async function DELETE(  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
    try{
   await connectDB()
   const c = await cookies()

     const token = c.get("token")?.value
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    await users.findByIdAndDelete(decoded.id)

     await c.delete("token")




   return NextResponse.json({message:"user Deleted"})

    }catch(error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}