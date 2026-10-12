import { Router } from "express";
import { body } from "express-validator";
import { createContactInquiry } from "../controller/contact.controller.js";

const router = Router();

router.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail(),
    body("phone")
      .optional({ values: "falsy" })
      .trim()
      .isLength({ max: 30 })
      .withMessage("Phone number must be 30 characters or fewer."),
    body("company")
      .optional({ values: "falsy" })
      .trim()
      .isLength({ max: 160 })
      .withMessage("Company name must be 160 characters or fewer."),
    body("projectType")
      .isIn(["mobile_app", "web_platform", "custom_erp", "ecommerce", "other"])
      .withMessage("Choose a project type."),
    body("budget")
      .optional({ values: "falsy" })
      .isIn(["under_5l", "5l_15l", "15l_50l", "50l_plus", "not_sure"])
      .withMessage("Choose a valid budget range."),
    body("description")
      .trim()
      .isLength({ min: 20, max: 5000 })
      .withMessage("Description must be between 20 and 5000 characters."),
  ],
  createContactInquiry,
);

export default router;