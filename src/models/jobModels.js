import mongoose,{Schema} from "mongoose"

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      minlength: 20,
      maxlength: 2000,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: 0,
    },
    skills: [
      {
        type: String,
        default: [],
        minlength: 2,
        maxlength: 30,
      },
    ],
    rank: {
      type: String,
      
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    freelancerAccepted: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: String,
      required: [true, "Project duration is required"],
     
    },
    status: {
      type: String,
      enum: [
        "progress",
        "completed",
        "active",
        "paused",
        "disputes",
        "specific",
        "review",
      ],
      default: "active",
    },
    application: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    jobType: {
      type: String,
      enum: ["oneTime", "ongoing", "contract"],
      default: "oneTime",
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    clientReviewDeadline: {
      type: Date,
    },
    freelancerReviewDeadline: {
      type: Date,
    },
    reviewChance: {
      type: Boolean,
      default: false,
    },
    budgetType: {
      type: String,
      enum: ["fixed", "hourly", "milestone"],
      default: "fixed",
    },
    category: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    experienceLevel: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    delivarables: {
      type: String,
      minlength: 5,
      maxlength: 500,
    },
    reviewChanges: {
      type: String,
      minlength: 5,
      maxlength: 500,
    },
    acceptedApplication: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
    reviewGiven: {
      byClient: {
        type: Boolean,
        default: false,
      },
      byFreelancer: {
        type: Boolean,
        default: false,
      },
    },
    paymentStatus: {
      advancePaid: {
        type: Boolean,
        default: false,
      },
      advancePaidAt: {
        type: Date,
      },
      finalPaid: {
        type: Boolean,
        default: false,
      },
      finalPaidAt: {
        type: Date,
      },
    },
    completionDate: {
      type: Date,
    },
    recievedDeliverables: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true }
);


//mongoose.models.Job : checks wheather models exist and mongoose.model('Job',jobSchema) creates a new model 
const Job =  mongoose.models.Job || mongoose.model('Job',jobSchema)
export default Job 