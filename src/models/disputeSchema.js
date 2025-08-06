import mongoose,{Schema} from "mongoose"

export const disputeSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    job : {
        type : Schema.Types.ObjectId,
        ref : "Job"
    },
    status : {
        type : String,
        enum : ["Active","Completed"],
        default : "Active"
    },
    disputeType : {
        type : String,
        enum : ["Client","Payment","Other","Freelancer"]
    },
    message : {
        type : String,
        required : true,
        min : 10,
        max : 400
    }
},{timestamps : true})

const Dispute = mongoose.model.Dispute || mongoose.model('Dispute',disputeSchema)
export default Dispute