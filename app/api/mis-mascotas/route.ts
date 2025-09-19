import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { connectDB } from "../../lib/mongodb";
import Adoption from "../../models/Adoption";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectDB();

    const adopciones = await Adoption.find({ email: session.user.email });

    return NextResponse.json(adopciones, { status: 200 });
  } catch (err) {
    console.error("Error obteniendo mis mascotas:", err);
    return NextResponse.json({ error: "Error al obtener mascotas" }, { status: 500 });
  }
}