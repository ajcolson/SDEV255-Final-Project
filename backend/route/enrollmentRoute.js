import express from "express"
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../controller/enrollmentController.js"

const router = express.Router()

router.get("/", getEnrollments)
router.post("/", createEnrollment)
router.patch("/:id", updateEnrollment)
router.delete("/:id", deleteEnrollment)

export default router
