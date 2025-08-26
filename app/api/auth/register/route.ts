import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/Users.model";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
      const { name, email, password } = await req.json();
  
      if (!name || !email || !password) {
        return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
      }
  
      await connectDB();
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "El correo ya está registrado" }, { status: 400 });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        name,
        email,
        password,
        role: "user",
      });
  
      return NextResponse.json({ message: "Usuario creado correctamente", userId: newUser._id }, { status: 201 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
  }