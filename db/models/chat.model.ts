import mongoose from "mongoose";


export interface IChat extends mongoose.Document {
    owner : typeof mongoose.Schema.ObjectId;
   
    content : {
        sender : typeof mongoose.Schema.ObjectId,
        message : String,
        createdAt : Date,
    }
}

// Creating document schema
const chatSchema = new mongoose.Schema<IChat>({
    owner : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
     content : [{
        sender : {
            type : mongoose.Schema.ObjectId,
            ref : "User",
            required: true,
        },
        message : {
            type : String,
            required : true,
            trim : true,
        },
        createdAt : {
            type : Date,
            default : Date.now,
        }

    }],
},{
    timestamps : true,
})


// Creating chat model
const chatModel = mongoose.model<IChat>('Chat', chatSchema);

export default chatModel;