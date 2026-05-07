import mongoose from "mongoose"
const { Schema, model } = mongoose

const studentSchema = new Schema({
  StudentID: String,
  StudentName: String
})

const Student = model("Student", studentSchema)
export default Student