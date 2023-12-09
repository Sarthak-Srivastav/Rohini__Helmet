import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import multer from "multer";
import path from "path";

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Multer configuration for profile photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// route to handle profile photo upload
app.post('/api/v1/upload', upload.single('profilephoto'), (req, res) => {
  // Handle file upload and store the filename in the user's profile
  const photoFilename = req.file.filename;
  // Save photoFilename in the user's profile (update database, etc.)
  res.json({ success: true, filename: photoFilename });
});


// route to retrieve a user's profile photo
app.get('/api/v1/photo/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the ecommerce app MERN",
  });
});

// Port
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(
    `Server Running ON ${process.env.DEV_MODE} mode on PORT ${PORT}`.bgCyan
      .white
  );
});
