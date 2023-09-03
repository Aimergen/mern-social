import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import authRoutes from "./routes/authRouter.js";
import { register } from "./controllers/auth.js";

// CONFIG
dotenv.config();
const app = express();
app.use(express(json()));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTE with Files
app.post("/auth/register", upload.single("picture"), register);

// ROUTES
app.use("/auth", authRoutes);
// app.use("/users", userRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGO-s connected"),
      app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch(err => console.log(`${err} did not connect`));
