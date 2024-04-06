import mongoose, {Schema} from "mongoose";

// User schema
const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        gender: {
            type: String,
            required: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        domain: {
            type: String,
            default: "",
            index: true
        },
        available: {
            type: Boolean,
            default: true,
            index: true
        },
    },
    {
        timestamps: true
    }
)

// Model
export const User = mongoose.model("User", userSchema)