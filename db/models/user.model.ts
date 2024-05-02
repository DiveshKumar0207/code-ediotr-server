import mongoose from "mongoose";

// Define an interface for the User document
export interface IUser extends mongoose.Document{
    name: string;
    email: string;
    password: string;
    isActive : Boolean;
    createdAt: Date;
}


// Creating user schema
const userSchema  = new mongoose.Schema<IUser>({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type: String,
        required : true,
        trim: true
    },
    isActive: { 
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, 
{
    timestamps: true,
}
);

// created user model
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;

