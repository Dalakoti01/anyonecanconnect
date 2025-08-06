import mongoose,{Schema} from "mongoose";

const hiringSchema = new Schema(
  {
    userDetails: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    yourSpecialization: {
      type: String,
      required: [true, "Specialization is required"],
      minlength: 3,
      maxlength: 100,
    },

    yearsOfExperience: {
      type: String,
      required: [true, "Years of experience is required"],
      minlength: 1,
      maxlength: 50,
    },

    skills: [
      {
        type: String,
        minlength: 2,
        maxlength: 30,
      },
    ],

    reason: {
      type: String,
      required: [true, "Reason is required"],
      minlength: 10,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const HiringAssistant = mongoose.models.HiringAssistant || mongoose.model('HiringAssistant',hiringSchema)
export default HiringAssistant