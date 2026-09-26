const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const uploadRoutes = require("./routes/uploadRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/ask", questionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "PDF Question Answer Backend is running"
  });
});

connectDB();

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});