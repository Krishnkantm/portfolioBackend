require('dotenv').config();
const express = require('express');
const cors  = require('cors'); // for frontend access
const connectDB = require('./config/db.js');
 // for environment variables

connectDB();

const cloudinary = require('./utlis/cloudinary.js');
const contactRoutes = require('./routes/contactRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const certificateRoutes = require('./routes/certificateRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const skillRoutes = require('./routes/skillRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const storageRoutes = require('./routes/storageRoutes.js');
const chatRoutes = require("./routes/chatRoutes.js");

const app = express();

//add middleware
const allowedOrigins = [
  "http://localhost:5000",
  "user-portfolio-iota.vercel.app",
 "https://portfoliobackend-1-ccd2.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.use('/api/contact',contactRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/certificates',certificateRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/skill',skillRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/storage',storageRoutes);
app.use('/api/chat',chatRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running...${PORT}`);
});
