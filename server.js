import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoute.js';
import facultyRoutes from './routes/facultyRoute.js';
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";



dotenv.config();
connectDB();



const __filename = fileURLToPath(import.meta.url);
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//all routes
app.use('/api/vit/auth/student',studentRoutes);
app.use('/api/vit/auth/faculty',facultyRoutes);

//rest api
app.get('/', (req, res) => {
  res.send({
    message: "Welcome to my app"
  })
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
