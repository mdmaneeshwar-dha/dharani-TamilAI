import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: "info" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema,
);
export default Notification;
