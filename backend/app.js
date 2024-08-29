import express from "express";
import cors from "cors";
import  {connectDB}  from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";
import nodemailer from 'nodemailer';


dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT;

connectDB();

const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  "http://localhost:3000",
  "http://localhost:3000",
  // add more origins as needed
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log(`Server is listening on http://localhost`);
});


// app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'ankitsingh30102000@gmail.com',
//     pass: 'lxqfdmglykwrktro'
//   }
// });

// app.post('/send-feedback', (req, res) => {
//   const { name, email, phone, feedback, rating } = req.body;

//   const mailOptions = {
//     from: 'ankitsingh30102000@gmail.com',
//     to: 'nimceto2022@gmail.com.com',
//     subject: 'New Feedback Submission',
//     text: `
//       Name: ${name}
//       Email: ${email}
//       Phone: ${phone}
//       Rating: ${rating}
//       Feedback: ${feedback}
//     `
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ success: false, message: 'Failed to send email' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).json({ success: true, message: 'Email sent successfully' });
//     }
//   });
// });