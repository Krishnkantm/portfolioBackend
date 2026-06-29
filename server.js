require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db.js");
connectDB();

require("./utlis/cloudinary.js");

const contactRoutes = require("./routes/contactRoutes.js");
const projectRoutes = require("./routes/projectRoutes.js");
const certificateRoutes = require("./routes/certificateRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const skillRoutes = require("./routes/skillRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const storageRoutes = require("./routes/storageRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "https://user-portfolio-iota.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/chat", chatRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
