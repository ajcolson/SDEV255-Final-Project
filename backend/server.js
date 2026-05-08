import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./conf/db.js";
import cors from "cors";
import Student from "./model/student.js";
import studentRoutes from "./route/studentRoute.js";
import Course from "./model/course.js";
import courseRoutes from "./route/courseRoute.js"
import Enrollment from "./model/enrollment.js";
import enrollmentRoutes from "./route/enrollmentRoute.js"
import User from "./model/user.js"
import userauthRoutes from "./route/userauthRoute.js"

// mongodb hack ... why does this work?
// This appears to be required for MongoDB to work for some clients
import dns from "node:dns/promises"; 
dns.setServers(["1.1.1.1", "1.0.0.1"]);


dotenv.config();
connectDB();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/userauth", userauthRoutes)
app.use("/students", studentRoutes)
app.use("/courses", courseRoutes)
app.use("/enrollments", enrollmentRoutes)

app.get("/",async(req,res)=>{
  res.send(`<h1>Backend is started!</h1><div>This is just the backend server. You can head to <a target="_blank" href="${process.env.FRONTEND_URL}">Frontend Site</a> to see how it is used.</div><div>Note: Due to some quirks with Render and its free hosting, you might need to reload this page to ensure the server stays running and allows the Frontend Site to work.</div>`)
})

app.listen(port, () => {
  console.log(`Server has started!`);
});