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
  res.send(`<!doctype html><html lang="en" data-bs-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Express Server</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous"></head><body><div class="card m-5 p-5"><h1 class="mb-2 pb-2">SDEV255 Final Backend</h1><p>This is the Backend Express server for the SDEV255 Final Project. This server doesn't serve the frontend application pages. Check out the <a target="_blank" href="${process.env.FRONTEND_URL}">Frontend Site</a> to see the full application.</p><h3>Note</h3><p>If the frontend site fails to load content or crashes, this backend server may have been stopped. You will need to <a href=".">Reload this page</a> to restart the server.</p></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script></body></html>`)
})

app.listen(port, () => {
  console.log(`Server has started!`);
});