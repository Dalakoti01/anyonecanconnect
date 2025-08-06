import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema(
  {
    sendersDetail: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender user reference is required"],
    },
    recieversDetail: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver user reference is required"],
    },
    category: {
      type: String,
      enum: ["Message", "Job", "Payments", "Proposals", "System", "Rating"],
      required: [true, "Notification category is required"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      minlength: 5,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || mongoose.model('Notification',notificationSchema)
export default Notification