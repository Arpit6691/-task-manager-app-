 const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

 app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});
module.exports = app;