import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import superAdmin from "@/models/super-admin";
import connectToDatabase from "@/lib/db";
import bcrypt from "bcryptjs";

// ====================== REGISTER ======================
export async function PUT(req) { // Using PUT here for register — you can change to POST if you prefer
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
      password, // will be hashed automatically via pre("save")
    });

    await newAdmin.save();

    // Create JWT
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

// ====================== LOGIN ======================
export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // Find admin
    const admin = await superAdmin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    // Update login status
    admin.loginStatus = true;
    admin.lastLogin = new Date();
    await admin.save();

    // Create JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        loginStatus: admin.loginStatus,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
