// models/User.ts
import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>("Users", userSchema);
export default User;
