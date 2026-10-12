import { validationResult } from "express-validator";
import mongoose from "mongoose";
import ContactInquiry from "../models/clint.Schema.js";

export const createContactInquiry = async (request, response) => {
  const validation = validationResult(request);

  if (!validation.isEmpty()) {
    return response.status(422).json({
      message: validation.array()[0].msg,
      errors: validation.array(),
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      message: "Contact submissions are temporarily unavailable. Please try again later.",
    });
  }

  const { name, email, phone, company, projectType, budget, description } = request.body;
  const inquiry = await ContactInquiry.create({
    name,
    email,
    phone,
    company,
    projectType,
    budget: budget || undefined,
    description,
  });

  return response.status(201).json({
    message: "Your project inquiry has been received.",
    id: inquiry.id,
  });
};