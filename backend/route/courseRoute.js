import express from "express"
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getIndividualCourse
} from "../controller/courseController.js"

const router = express.Router()

router.get("/", getCourses)
router.get("/:id",getIndividualCourse)
router.post("/", createCourse)
router.patch("/:id", updateCourse)
router.delete("/:id", deleteCourse)

export default router