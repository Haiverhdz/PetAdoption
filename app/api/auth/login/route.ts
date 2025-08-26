import { NextResponse } from "next/server";
import User from "../../../models/Users.model";
import { connectDB } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      message: "Autenticado",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
