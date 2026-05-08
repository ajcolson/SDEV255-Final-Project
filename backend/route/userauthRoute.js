import express from "express"
import {
  createUser,
  authUser
} from "../controller/userauthController.js"

const router = express.Router();

router.get("/", async (req, res)=>{
  res.status(400).json({error:"Invalid Request"})
})
router.post("/create", createUser)
router.post("/auth", authUser)

export default router
