import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import config from "./config/config.js";
import passport from "passport";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import helmet from "helmet";
import contactRoutes from "./routes/contact.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
);
app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cookieParser());
app.use(passport.initialize());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});


app.use(express.static("./public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api", apiLimiter);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);

app.get("/{*path}", (request, response, next) => {
  if (
    request.path === "/api" ||
    request.path.startsWith("/api/") ||
    !request.accepts("html")
  ) {
    return next();
  }

  return response.sendFile("index.html", { root: "public" });
});

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status ?? 500).json({
    error: error.status && error.status < 500 ? error.message : "Internal server error",
  });
});

export default app;
