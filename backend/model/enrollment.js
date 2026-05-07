import mongoose from "mongoose"
const { Schema, model } = mongoose

const enrollmentSchema = new Schema({
  CourseID: String,
  StudentID: String,
  EnrollmentID: String
})

const Enrollment = model("Enrollment", enrollmentSchema)
export default Enrollment