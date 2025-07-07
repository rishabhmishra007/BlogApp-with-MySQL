import express from "express";
import cors from "cors";
import postRoutes from "./routes/postsRoute.js";
import authRoutes from "./routes/authRoute.js";
import usersRoutes from "./routes/usersRoute.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import { db } from "./db.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, '../client/public/upload')
  },
  filename: function(rea, file, cb){
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage})

app.post('/api/v1/upload', upload.single('file'), function(req, res) {
  const file = req.file;
  return res.status(200).json(file.filename);
})

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);

db.getConnection((err) => {
  if (err) {
    console.error("Db connection failed:", err.stack);
    process.exit(1);
  } else {
    console.log("Db connected Successfully");
    app.listen(8000, () => {
      console.log("server running at port: 8000");
    });
  }
});
