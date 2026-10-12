import "dotenv/config";

const port = Number(process.env.PORT) || 5000;

const config = Object.freeze({
  port,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || "",
  jwtSecret: process.env.JWT_SECRET || "",
  secureCookies: process.env.NODE_ENV === "production",
});

export default config;