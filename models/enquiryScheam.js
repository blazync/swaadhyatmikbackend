import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    enquiry: {
        type: String,
        required: true
    },
    cratedAt: {
        type: Date, 
        default: Date.now 
    },
    updatedAt: {
        type: Date, 
        default: Date.now 
    }
});

/** Creating Collection */
const Users = mongoose.model('User', userSchema);

export default Users;
