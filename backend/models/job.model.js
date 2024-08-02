import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:String,
        required:true
    },
    salary:{
        type:SVGAnimatedNumber,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application"
    }]

},{timestamps:true});

export const Job = mongoose.model("Job",jobSchema);