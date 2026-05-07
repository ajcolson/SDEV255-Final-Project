import express from "express"
import Enrollment from "../model/enrollment.js"
export const getEnrollments = async (req, res) => {
  try {
    const allEnrollments = await Enrollment.find({})
    res.status(200).json({
      resultType: "success",
      messageText: allEnrollments,
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
export const createEnrollment = async (req, res) => {
  try {
    const courseID = req.body.CourseID
    const studentID = req.body.StudentID
    const enrollID = req.body.EnrollmentID

    const newEnrollment = await Enrollment.create({
      CourseID: courseID,
      StudentID: studentID,
      EnrollmentID: enrollID
    })
    const done = await newEnrollment.save()
    res.status(201).json({
      resultType: "success",
      messageText: newEnrollment,
      error: error.message
    })
  } catch (error) {
    res.status(400).json({
      resultType: "error",
      messageText: "Failed to create enrollment",
      error: error.message
    })
  }
}
export const updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
    if (!updatedEnrollment) {
      return res.status(404).json({
        resultType: "error",
        messageText: "Enrollment not found",
        error: "Enrollment not found"
      })
    }
    res.status(200).json({
      resultType: "success",
      messageText: updatedEnrollment,
      error:""
    })
  } catch (error) {
    res.status(400).json({
      resultType:"error",
      messageText: "Failed to update enrollment",
      error: error.message,
    })
  }
}
export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id)
    if (!deletedEnrollment) {
      return res.status(404).json({
        resultType: "error",
        messageText: "Enrollment not found",
        error: "Enrollment not found"
      })
    }
    res.status(200).json({
      resultType: "success",
      messageText: "Enrollment deleted successfully",
      error:""
    })
  } catch (error) {
    res.status(500).json({
      resultType:"error",
      messageText: "Failed to delete enrollment",
      error: error.message,
    })
  }
}


