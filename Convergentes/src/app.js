import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import cookieParser from "cookie-parser";
//import taksRoutes from "./routes/tasks.routes.js";
//import { FRONTEND_URL } from "./config.js";

const app = express();
app.use(
  cors({
    origin(origin, cb) {
      // permite también requests sin Origin (curl/postman)
      if (!origin) return cb(null, true);
      return cb(null, true); // acepta TODO origen
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// (opcional) responder preflight para cualquier ruta
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", notesRoutes);

export default app;
