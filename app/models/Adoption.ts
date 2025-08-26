import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  petId: String,
  petImage: String,
  status: { type: String, enum: ["pendiente", "aprobada", "rechazada"], default: "pendiente" },
}, { timestamps: true });

export default mongoose.models.Adoption || mongoose.model("Adoption", adoptionSchema);
