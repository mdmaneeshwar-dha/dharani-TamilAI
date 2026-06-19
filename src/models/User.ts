import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  level: string;
  xp: number;
  streak: number;
  pronunciationScore: number;
  wordsLearned: number;
  lessonsCompleted: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  level: { type: String, default: "Beginner" },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  pronunciationScore: { type: Number, default: 0 },
  wordsLearned: { type: Number, default: 0 },
  lessonsCompleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
