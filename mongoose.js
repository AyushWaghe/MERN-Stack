import mongoose from "mongoose";

// Validating faculty schema
const facultySchema = new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   facultySkills:{
      type:[String],
      required:true,
   },
   domain:{
    type:String,
    required:true,
 },
 facultyProjectIds:{
    type:[Number],
    required:true,
 },
   role: {
    type:Number,
    default:1
   },
},{timestamps:true}      //to get time when user gave data
);

// Validating student schema
const studentSchema = new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   studentSkills:{
      type:[String],
      required:true,
   },
   links:{
    type:String,
    required:true,
 },
   studentProjectIds:{
    type:[Number],
    required:true,
 },
   role: {
    type:Number,
    default:0
   },
},{timestamps:true}      //to get time when user gave data
);

// Creating models
const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

export default Student;
