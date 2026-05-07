import express from "express"
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getIndividualStudent,
} from "../controller/studentController.js"

const router = express.Router();

router.get("/", getStudents)
router.get("/:id",getIndividualStudent)
router.post("/", createStudent)
router.patch("/:id", updateStudent)
router.delete("/:id", deleteStudent)

export default router
