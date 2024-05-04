import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const contactDetailsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    message: {
        type: String
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

// Creating the ContactDetails model
const ContactDetails = mongoose.model('ContactDetails', contactDetailsSchema);

export default ContactDetails;
