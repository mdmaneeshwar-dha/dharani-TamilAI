import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITaskAssignment extends Document {
  userId: Types.ObjectId;
  taskId: Types.ObjectId;
  completed: boolean;
  assignedDate: Date;
  dueDate: Date;
}

const TaskAssignmentSchema = new Schema<ITaskAssignment>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  completed: { type: Boolean, default: false },
  assignedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
});

const TaskAssignment = mongoose.model<ITaskAssignment>(
  "TaskAssignment",
  TaskAssignmentSchema,
);
export default TaskAssignment;
