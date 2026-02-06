import { connectDB } from "@/lib/db";
import users from "@/models/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await users.findOne({ email });
    if (!user) return NextResponse.json({ message: "User doesn't exist" }, { status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid Email or Password" }, { status: 400 });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    const response = NextResponse.json({ message: "Logged in" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,   
      sameSite: "lax", 
      path: "/",    
      maxAge: 7 * 24 * 60 * 60, 
    });

    return response; 

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
