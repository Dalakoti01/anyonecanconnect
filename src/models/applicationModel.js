import mongoose,{Schema} from "mongoose"

const applicationSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
    applicant: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Applicant user is required"],
      },
      coverLetter: {
        type: String,
        required: [true, "Cover letter is required"],
        minlength: 20,
        maxlength: 2000,
      },
      yourApproach: {
        type: String,
        required: [true, "Your approach is required"],
        minlength: 20,
        maxlength: 2000,
      },
      estimatedTimeLine: {
        type: String,
        required: [true, "Estimated timeline is required"],
        minlength: 3,
        maxlength: 100,
      },
      yourBid: {
        type: String,
        required: [true, "Your bid is required"],
        minlength: 1,
        maxlength: 20,
      },
      portfolio: {
        type: String,
        maxlength: 300,
      },
      questionsForClient: {
        type: String,
        maxlength: 1000,
      },
      paymentDeliveryTerms: {
        type: String,
        maxlength: 1000,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job reference is required"],
    },
  },
  { timestamps: true }
);



//mongoose.models.Job : checks wheather models exist and mongoose.model('Job',jobSchema) creates a new model 
const Application =  mongoose.models.Application || mongoose.model('Application',applicationSchema)
export default Application 