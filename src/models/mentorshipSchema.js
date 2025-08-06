import mongoose,{Schema} from "mongoose";

const mentorshipSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    },

    currentProfession: {
      type: String,
      required: [true, "Current profession is required"],
      minlength: 2,
      maxlength: 100,
    },

    experience: {
      type: String,
      required: [true, "Experience information is required"],
      minlength: 1,
      maxlength: 50,
    },

    areaOfExpertise: [
      {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
    ],

    professionalBio: {
      type: String,
      required: [true, "Professional bio is required"],
      minlength: 30,
      maxlength: 2000,
    },

    linkedin: {
      type: String,
      required: [true, "LinkedIn profile URL is required"],
      maxlength: 300,
      match: [/^https:\/\/(www\.)?linkedin\.com\/.*$/, "Please provide a valid LinkedIn URL"],
    },

    availability: {
      type: String,
      required: [true, "Availability is required"],
      minlength: 3,
      maxlength: 100,
    },

    mentoringType: [
      {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
    ],

    reason: {
      type: String,
      required: [true, "Reason for mentorship is required"],
      minlength: 10,
      maxlength: 1000,
    },

    freeSession: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Mentorship = mongoose.models.Mentorship || mongoose.model('Mentorship',mentorshipSchema)
export default Mentorship