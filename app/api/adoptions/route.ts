import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Adoption from "../../models/Adoption";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, petId, petName, petImage } = await req.json();

    if (!name || !email || !message || !petId || !petImage) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    await connectDB();

    const adoption = await Adoption.create({
      name,
      email,
      message,
      petId,
      petImage,
      status: "pendiente",
    });

    (async () => {
      try {
        await resend.emails.send({
          from: "Adopciones <onboarding@resend.dev>",
          to: "haiverhercas@gmail.com",
          subject: `Nueva solicitud para ${petName}`,
          html: `
            <h2>Solicitud de adopción</h2>
            <p><b>Nombre:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Mensaje:</b> ${message}</p>
            <p><b>Mascota:</b> ${petName}</p>
            <img src="${petImage}" width="200"/>
          `,
        });
      } catch (err) {
        console.error("Error enviando correo:", err);
      }
    })();

    return NextResponse.json({ success: true, adoption });
  } catch (err) {
    console.error("Error creando adopción:", err);
    return NextResponse.json({ error: "Error al enviar la solicitud" }, { status: 500 });
  }
}
