import mongoose from "mongoose"
const { Schema, model } = mongoose

const courseSchema = new Schema({
  CourseID: String,
  CourseName: String,
  CourseNumber: String,
  CourseInstructionType: String
})

const Course = model("Course", courseSchema)
export default Course