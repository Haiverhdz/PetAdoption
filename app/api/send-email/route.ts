import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Adoption from "../../models/Adoption";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, breed, age, description, vaccines, petImage } = body;

    if (!petImage) {
      return NextResponse.json(
        { error: "No se proporcionó imagen" },
        { status: 400 }
      );
    }
    let base64Image = petImage;
    if (!base64Image.startsWith("data:image")) {
      base64Image = `data:image/png;base64,${base64Image}`;
    }

    let uploadResult;
    try {
      uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: "adoptions",
        format: "png",
      });
    } catch (err) {
      console.error("Error subiendo imagen a Cloudinary:", err);
      return NextResponse.json(
        { error: "Error subiendo imagen a Cloudinary" },
        { status: 500 }
      );
    }

    const petImageUrl = uploadResult.secure_url;

    await connectDB();

    const adoption = await Adoption.create({
      name,
      email: body.email || "admin@adoptions.com",
      message: description || "",
      petId: breed + "-" + Date.now(),
      petImage: petImageUrl,
      status: "pendiente",
    });

    // Enviar correo al admin
    try {
      await resend.emails.send({
        from: "Adopciones <onboarding@resend.dev>",
        to: "haiverhercas@gmail.com",
        subject: "Nueva solicitud de adopción",
        html: `
          <h2>Solicitud de adopción</h2>
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Raza:</b> ${breed}</p>
          <p><b>Edad:</b> ${age}</p>
          <p><b>Descripción:</b> ${description}</p>
          <p><b>Vacunas:</b> ${vaccines}</p>
          <img src="${petImageUrl}" width="200"/>
        `,
      });
    } catch (err) {
      console.error("Error enviando correo al admin:", err);
    }

    return NextResponse.json({ success: true, adoption });
  } catch (error) {
    console.error("Error procesando POST:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const adoptions = await Adoption.find().sort({ createdAt: -1 });
    return NextResponse.json(adoptions);
  } catch (error) {
    console.error("Error en GET:", error);
    return NextResponse.json(
      { error: "Error al cargar solicitudes: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    await connectDB();
    const adoption = await Adoption.findByIdAndUpdate(id, { status }, { new: true });

    if (!adoption) {
      return NextResponse.json(
        { error: "Adopción no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(adoption);
  } catch (error) {
    console.error("Error procesando PATCH:", error);
    return NextResponse.json(
      { error: "Error actualizando estado: " + (error as Error).message },
      { status: 500 }
    );
  }
}
