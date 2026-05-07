import express from "express"
import Student from "../model/student.js"
import Course from "../model/course.js"
import Enrollment from "../model/enrollment.js"

export const getStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({})
    res.status(200).json({
      resultType: "success",
      messageText: allStudents,
      error: ``
    })
  } catch (error) {
    res.status(500).json({
      resultType: "error",
      messageText: `{error.message}`,
      error: `{error.message}`
    })
  }
}
export const createStudent = async (req, res) => {
  try {
    const name = req.body.StudentName
    const id = req.body.StudentID
    const newStudent = await Student.create({
      StudentID: id,
      StudentName: name
    })
    const done = await newStudent.save()
    res.status(201).json({
      resultType: "success",
      messageText: savedStudent,
      error: error.message
    })
  } catch (error) {
    res.status(400).json({
      resultType: "error",
      messageText: "Failed to create student",
      error: error.message
    })
  }
}
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
    if (!updatedStudent) {
      return res.status(404).json({
        resultType: "error",
        messageText: "Student not found",
        error: "Student not found"
      })
    }
    res.status(200).json({
      resultType: "success",
      messageText: updatedStudent,
      error:""
    })
  } catch (error) {
    res.status(400).json({
      resultType:"error",
      messageText: "Failed to update student",
      error: error.message,
    })
  }
}
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    const deletedStudent = await Student.findByIdAndDelete(id)
    if (!deletedStudent) {
      return res.status(404).json({
        resultType: "error",
        messageText: "Student not found",
        error: "Student not found"
      })
    }
    res.status(200).json({
      resultType: "success",
      messageText: "Student deleted successfully",
      error:""
    })
  } catch (error) {
    res.status(500).json({
      resultType:"error",
      messageText: "Failed to delete student",
      error: error.message,
    })
  }
}
export const getIndividualStudent = async (req,res) =>{
  try {
    const { id } = req.params
    let studentData = {
      details:{},
      courses:[]
    }
    studentData.details = await Student.findOne({"StudentID":id})
    let enrollments = await Enrollment.find({"StudentID":id})
    let foundCourses = []
    for (let ind in enrollments){
      let cid = enrollments[ind].CourseID
      if (!foundCourses.includes(cid)){
        foundCourses.push(cid)
        let course = await Course.findOne({"CourseID":cid})
        studentData.courses.push(course)
      }
    }
    res.status(200).json({
      resultType: "success",
      messageText: studentData,
      error: ``
    })
  } catch(error) {
    res.status(500).json({
      resultType:"error",
      messageText: "Failed to get student information",
      error: error.message,
    })
  }
}

