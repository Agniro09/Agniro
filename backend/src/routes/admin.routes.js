import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  getAdminSession,
  listInquiries,
  loginAdmin,
  logoutAdmin,
  updateInquiryStatus,
} from "../controller/admin.controller.js";
import requireAdmin from "../middleware/requireAdmin.js";
import { adminProjectRouter } from "./project.routes.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many sign-in attempts. Please try again in 15 minutes." },
});

router.post("/login", loginLimiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/session", requireAdmin, getAdminSession);
router.get("/inquiries", requireAdmin, listInquiries);
router.patch("/inquiries/:id/status", requireAdmin, updateInquiryStatus);
router.use("/projects", adminProjectRouter);

export default router;
