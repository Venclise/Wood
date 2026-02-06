import { connectDB } from "@/lib/db";
import users from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async  function POST(req:Request) {
try {
    await connectDB()

    const {name,email,password
    } = await  req.json()

    const existingUser = await users.findOne({email})
    if(existingUser) {
      return  NextResponse.json("User already exists",{status:400})
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await users.create({
        email,
        name,
        password: hashedPassword
    })

       const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
   return NextResponse.json({ token, user });
  } catch (error) {
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}