import mongoose from "mongoose";

const { Schema } = mongoose;

const permissionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

/** Creating Collection */
const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
