import express from "express";
import cors from 'cors';
// import connectDB from './config/db.js';
import dotenv from 'dotenv';
// import studentRoutes from './routes/studentRoute.js';
// import facultyRoutes from './routes/facultyRoute.js';
// import colors from "colors";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
// import connectDB from "./config/db.js";
const saltRounds = 10;


//configure env
dotenv.config();
//db config
// mongoose.connect('mongodb://127.0.0.1:27017/mernstack', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
// connectDB();

const DB='mongodb+srv://siddharajvk:J57243kSiPZBxY2q@mern.j4bhowe.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex:true,
  // useFindAndModify: false,
}).then(()=>{
  console.log("Connected to db")
}).catch((err)=>console.log(err));



const __filename = fileURLToPath(import.meta.url);
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//all routes
// app.use('/api/vit/auth/student',studentRoutes);
// app.use('/api/vit/auth/faculty',facultyRoutes);

//rest api
app.get('/', (req, res) => {
  res.send({
    message: "Welcome to my app"
  })
})

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  studentSkills: {
    type: [String],
    required: true,
  },
  links: {
    type: String,
    required: true,
  },
  studentProjectIds: {
    type: [Number],
    required: true,
  },
  role: {
    type: Number,
    default: 0
  },
}, { timestamps: true }      //to get time when user gave data
);

const Student = mongoose.model('Student', studentSchema);

app.post('/studentLogin', async (req, res) => {
  try {
    const { email, password } = req.body;
      console.log(email, password);
    const totalStudents = await Student.countDocuments();
    console.log("Total number of students:", totalStudents);

    const foundUser = await Student.findOne({ email: email });

    if (!foundUser) {
      console.log("User not found");
      return res.send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    
    // console.log("Password matchabaa: ", passwordMatch);
    if (passwordMatch == true) {
      return res.send({ success: true, message: "User logged in successfully" });
    } else {
      return res.send("Incorrect password");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: 'Signin unsuccessful' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
