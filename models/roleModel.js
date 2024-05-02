import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});

/** Creating Collection */
const Role = mongoose.model('Role', roleSchema);

export default Role;
