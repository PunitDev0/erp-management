import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import superAdmin from "@/models/super-admin";
import connectToDatabase from "@/lib/db";
import bcrypt from "bcryptjs";

// ====================== REGISTER (POST) ======================
export async function POST(req) {
  try {
    await connectToDatabase();
    const { username, email, password } = await req.json();

    // Check if user already exists
    const existingAdmin = await superAdmin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Create new admin
    const newAdmin = new superAdmin({
      username,
      email,
      password, // will be hashed automatically via pre("save") in schema
    });

    await newAdmin.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Registration successful",
      token,
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        loginStatus: newAdmin.loginStatus,
        createdAt: newAdmin.createdAt
      }
    });

  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
