const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const Ajv = require("ajv");
const ejs = require("ejs");
const fs = require("fs");
const pdf1 = require("pdf-creator-node");
const pdf = require("html-pdf");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//auth Routes
let authRouter = require("./routes/auth");
let studentRouter = require("./routes/students");
let adminRouter = require("./routes/admin");
let courseRouter = require("./routes/courses");
let trackRouter = require("./routes/tracks");
let enrollRouter = require("./routes/enrolledCourses");
let lessonRouter = require("./routes/lesson");
let instructorRouter = require("./routes/instructor");
let emailRouter = require("./routes/mail");

app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/courses", courseRouter);
app.use("/api/tracks", trackRouter);
app.use("/api", enrollRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api", emailRouter);
const certificateRoutes = require("./routes/certificate");

app.use(express.static("upload_Imgs"));
app.use(express.static("upload_vedio"));

app.set("view engine", "ejs");
let PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
//mongoose.connect("mongodb://127.0.0.1:27017/API")

mongoose.connect(process.env.mongodb_Url);
app.use("/docs", express.static(path.join(__dirname, "docs")));
app.use(certificateRoutes.routes);
//mongoose.connect("mongodb+srv://MennaMagdy:m01096757508@cluster0.vzfel0r.mongodb.net/API")
