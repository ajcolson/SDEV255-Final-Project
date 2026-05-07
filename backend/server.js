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

// mongodb hack ... why does this work?
// This appears to be required for MongoDB to work for some clients
import dns from "node:dns/promises"; 
dns.setServers(["1.1.1.1", "1.0.0.1"]);


dotenv.config();
connectDB();
const app = express();
const port = process.env.DB_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes)
app.use("/enrollments", enrollmentRoutes)

app.listen(port, () => {
  console.log(`Server has started!`);
});