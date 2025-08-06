import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [
        function () {
          return !this.isGoogleUser;
        },
        "Full Name is Required",
      ],
      minlength: 3,
      maxlength: 40,
    },
    username: {
      type: String,
      required: [
        function () {
          return !this.isGoogleUser;
        },
        "Username is Required",
      ],
      unique: true,
      minlength: 3,
      maxlength: 40,
    },
    role: {
      type: String,
      enum: ["freelancer", "client", "admin"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 40,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.isGoogleUser;
        },
        "Password is Required",
      ],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    verification: {
      otp: { type: String },
      validity: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: false, // Must be set true in createUserIfNotExists when using Google
    },
    experience: { type: Number, default: 0 },
    hasPassword: { type: Boolean, default: false },
    verifiedFreelancer: { type: Boolean, default: false },
    profile: {
      bio: { type: String },
      profilePhoto: { type: String, default: "" },
      languages: { type: [String], default: [] },
      professionalTitle: { type: String },
    },
    mentor: { type: Boolean, default: false },
    hiringAssistantStatus: {
      type: String,
      enum: ["Inactive", "Pending", "Accepted", "Rejected"],
      default: "Inactive",
    },
    projectCompleted: { type: Number, default: 0 },
    skillProfile: {
      category: { type: String },
      subCategory: [{ type: String, default: [] }],
      uspSkill: [{ type: String, default: [] }],
      resume: { type: String },
      resumeOriginalName: { type: String },
    },
    connectedFreelancers: [
      {
        freelancer: { type: Schema.Types.ObjectId, ref: "User" },
        connectedAt: { type: Date, default: Date.now },
      },
    ],
    rejectedJobs: [{ type: Schema.Types.ObjectId, ref: "Job", default: 0 }],
    proposalsSent: [{ type: Schema.Types.ObjectId, ref: "Application", default: 0 }],
    proposalsAccepted: { type: Number, default: 0 },
    proposalsRejected: { type: Number, default: 0 },
    rank: { type: String, default: "Not Calculated" },
    rupees: { type: Number, default: 0 },
    activeJobs: [{ type: Schema.Types.ObjectId, ref: "Job", default: 0 }],
    connectedClient: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subscribed: { type: Boolean, default: false },
    money: { type: Number, default: 0 },
    profileCompletion: { type: Number, default: 25, max: 100 },
    yourRating: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        job: { type: Schema.Types.ObjectId, ref: "Job" },
        rating: { type: Number },
        feedback: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
