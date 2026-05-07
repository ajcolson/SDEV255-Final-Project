import express from "express"
import Course from "../model/course.js"
import Enrollment from "../model/enrollment.js"
import Student from "../model/student.js"

export const getCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({})
    res.status(200).json({
      resultType: "success",
      messageText: allCourses,
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
export const createCourse = async (req, res) => {
  try {
    const name = req.body.CourseName
    const id = req.body.CourseID
    const number = req.body.CourseNumber
    const instructType = req.body.CourseInstructionType

    const newCourse = await Course.create({
        CourseID: id,
        CourseName: name,
        CourseNumber: number,
        CourseInstructionType: instructType
    })
    const done = await newCourse.save()
    res.status(201).json({
      resultType: "success",
      messageText: newCourse,
      error: error.message
    })
  } catch (error) {
    res.status(400).json({
      resultType: "error",
      messageText: "Failed to create course",
      error: error.message
    })
  }
}
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
    if (!updatedCourse) {
      return res.status(404).json({
        resultType: "error",
        messageText: "Course not found",
        error: "Course not found"
      })
    }
    res.status(200).json({
      resultType: "success",
      messageText: updatedCourse,
      error:""
    })
  } catch (error) {
    res.status(400).json({
      resultType:"error",
      messageText: "Failed to update course",
      error: error.message,
    })
  }
}
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCourse = await Course.findByIdAndDelete(id)
    if (!deletedCourse) {
      return res.status(404).json({
        resultType: "error",
        messageText: "Course not found",
        error: "Course not found"
      })
    }
    res.status(200).json({
      resultType: "success",
      messageText: "Course deleted successfully",
      error:""
    })
  } catch (error) {
    res.status(500).json({
      resultType:"error",
      messageText: "Failed to delete course",
      error: error.message,
    })
  }
}
export const getIndividualCourse = async (req,res) =>{
  try {
    const { id } = req.params
    let courseData = {
      details:{},
      students:[]
    }
    courseData.details = await Course.findOne({"CourseID":id})
    let enrollments = await Enrollment.find({"CourseID":id})
    let foundStudents = []
    for (let ind in enrollments){
      let sid = enrollments[ind].StudentID
      if (!foundStudents.includes(sid)){
        foundStudents.push(sid)
        let student = await Student.findOne({"StudentID":sid})
        courseData.students.push(student)
      }
    }
    res.status(200).json({
      resultType: "success",
      messageText: courseData,
      error: ``
    })
  } catch(error) {
    res.status(500).json({
      resultType:"error",
      messageText: "Failed to get course information",
      error: error.message,
    })
  }
}
