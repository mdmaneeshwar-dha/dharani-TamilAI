import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  xpReward: number;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  xpReward: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
