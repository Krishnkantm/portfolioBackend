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

const app = express();

//add middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
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

app.use('/api/contact',contactRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/certificates',certificateRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/skill',skillRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/storage',storageRoutes);

// console.log("db_name",process.env.CLOUD_NAME);
// console.log("db_name2",cloudinary.config());

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running...${PORT}`);
});