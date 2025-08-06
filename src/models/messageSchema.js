import mongoose,{Schema} from "mongoose";

const messageSchema = new Schema(
  {
    sendersId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
    },
    recieversId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver ID is required"],
    },
    message: {
      type: String,
      required: [true, "Message text is required"],
      minlength: 1,
      maxlength: 2000,
    },
    fileUrl: {
      type: String,
      maxlength: 500,
    },
    fileType: {
      type: String,
      enum: ["text", "image", "pdf", "zip"],
    },
    projectBrief: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message',messageSchema)
export default Message