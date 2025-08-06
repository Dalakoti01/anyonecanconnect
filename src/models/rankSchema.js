import mongoose,{Schema} from "mongoose";

const rankSchema = new Schema(
  {
    userDetails: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required for ranking"],
    },
    clientRating: {
      totalRating: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    timeAccuracy: {
      beforeReview: {
        timelySubmissions: {
          type: Number,
          default: 0,
          min: 0,
        },
        totalDeliveries: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
      afterReview: {
        timelySubmissions: {
          type: Number,
          default: 0,
          min: 0,
        },
        totalDeliveries: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    },
    rehireRate: {
      sameClient: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalWork: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    subjectKnowledge: {
      type: Number,
      default: 0,
      min: 0,
    },
    freelanceQuiz: {
      quizScore: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalQuiz: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    responseTime: {
      totalScore: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalWork: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    conversionRate: {
      acceptedProposals: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalProposals: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    uspClearity: {
      uspRelated: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalWorkDone: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    plaigFreeContent: {
      type: Number,
      default: 0,
      min: 0,
    },
    platformLoyality: {
      type: Number,
      default: 0,
      min: 0,
    },
    rank: {
      type: String,
      default: "Not Calculated",
    },
  },
  { timestamps: true }
);

const Rank = mongoose.models.Rank || mongoose.model('Rank',rankSchema)
export default Rank