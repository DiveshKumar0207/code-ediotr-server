import mongoose from "mongoose";

export interface IDocument extends mongoose.Document {
    owner : typeof mongoose.Schema.ObjectId;
    collaborators : typeof mongoose.Schema.ObjectId;
    content : {
        filename : String,
        filedata : String,
    };
    createdAt: Date;
    updatedAt: Date;
}


// Creating document schema
const documentSchema = new mongoose.Schema<IDocument>({
    owner : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
    collaborators : [{
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }],
    content : [{
        filename : {
            type : String,
            required : true, 
            trim : true,
        },
        filedata : {
            type : String,
            required : true,
            trim : true,
        }
    }],
},{
    timestamps : true,
})


// Creating document model
const documentModel = mongoose.model<IDocument>('Document', documentSchema);

export default documentModel;