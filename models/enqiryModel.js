import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const enquirySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    enquiry_name: {
        type: String,
        required: true,
    },
    service_type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating Collection
const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
