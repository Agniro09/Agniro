import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  createProject,
  listProjects,
  removeProject,
} from "../controller/project.controller.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();

router.get("/", listProjects);
export const adminProjectRouter = Router();
adminProjectRouter.use(requireAdmin);
adminProjectRouter.get("/", listProjects);
adminProjectRouter.post(
  "/",
  [
    body("title").trim().isLength({ min: 2, max: 100 }).withMessage("Title must be between 2 and 100 characters."),
    body("category").trim().isLength({ min: 2, max: 60 }).withMessage("Category must be between 2 and 60 characters."),
    body("tagline").trim().isLength({ min: 4, max: 180 }).withMessage("Tagline must be between 4 and 180 characters."),
    body("description").trim().isLength({ min: 10, max: 2000 }).withMessage("Description must be between 10 and 2000 characters."),
    body("imageUrl")
      .trim()
      .isLength({ max: 2048 })
      .isURL({ protocols: ["https"], require_protocol: true })
      .withMessage("Enter an HTTPS image URL."),
    body("projectUrl")
      .optional({ values: "falsy" })
      .trim()
      .isLength({ max: 2048 })
      .isURL({ protocols: ["https"], require_protocol: true })
      .withMessage("Enter a valid HTTPS project link."),
  ],
  (request, response, next) => {
    const validation = validationResult(request);
    if (!validation.isEmpty()) {
      return response.status(422).json({ message: validation.array()[0].msg });
    }
    return next();
  },
  createProject,
);
adminProjectRouter.delete("/:id", removeProject);

export default router;
