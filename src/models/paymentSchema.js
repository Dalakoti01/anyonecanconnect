import mongoose,{Schema} from "mongoose"

const paymentSchema = new Schema({
    razorpay_order_id : {
        type : String,
        required : true
    },
    razorpay_payment_id : {
        type : String,
        required : true
    },
    razorpay_signature : {
        type : String,
        required :true,
    },
    application : {
        type : Schema.Types.ObjectId,
        ref : "Application"
    },
    job : {
        type : Schema.Types.ObjectId,
        ref : "Job"
    },
    freelancer : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    paymentType : {
        type: String,
        enum : ["Advance","Complete"],
        default : "Advance"
    },
    amount : {
        type : Number,
        required : true
    },
    currency : {
        type : String,
        default : "INR"
    },
    status: {
    type: String,
    enum: ["Half","Completed", "Failed", "Refunded"],
    default: "Half"
}

},{timestamps : true})

const Payment = mongoose.models.Payment || mongoose.model('Payment',paymentSchema)
export default Payment