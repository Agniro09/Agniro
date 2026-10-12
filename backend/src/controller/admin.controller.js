import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import ContactInquiry from "../models/clint.Schema.js";
import config from "../config/config.js";

const cookieOptions = {
  httpOnly: true,
  secure: config.secureCookies,
  sameSite: "strict",
  path: "/api/admin",
  maxAge: 8 * 60 * 60 * 1000,
};

const statuses = ["new", "reviewed", "contacted", "closed"];

export const loginAdmin = async (request, response) => {
  const { email, password } = request.body;

  if (!config.adminEmail || !config.adminPasswordHash || !config.jwtSecret) {
    return response.status(503).json({ message: "Admin login is not configured on the server." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return response.status(400).json({ message: "Enter your admin email and password." });
  }

  const emailMatches = email.trim().toLowerCase() === config.adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(password, config.adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    return response.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ email: config.adminEmail }, config.jwtSecret, { expiresIn: "8h" });
  return response.cookie("admin_session", token, cookieOptions).json({
    message: "Signed in successfully.",
    admin: { email: config.adminEmail },
  });
};

export const getAdminSession = (request, response) => {
  return response.json({ admin: request.admin });
};

export const logoutAdmin = (_request, response) => {
  const { maxAge: _maxAge, ...clearOptions } = cookieOptions;
  return response.clearCookie("admin_session", clearOptions).json({ message: "Signed out." });
};

export const listInquiries = async (request, response) => {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({ message: "Inquiry storage is temporarily unavailable." });
  }

  const { status, search = "" } = request.query;
  if (status && !statuses.includes(status)) {
    return response.status(400).json({ message: "Choose a valid inquiry status." });
  }
  if (typeof search !== "string") {
    return response.status(400).json({ message: "Search must be a single text value." });
  }

  const query = {};
  if (status) query.status = status;

  const trimmedSearch = search.trim();
  if (trimmedSearch) {
    const escapedSearch = trimmedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escapedSearch, "i");
    query.$or = [
      { name: pattern },
      { email: pattern },
      { company: pattern },
      { description: pattern },
    ];
  }

  const inquiries = await ContactInquiry.find(query)
    .sort({ createdAt: -1 })
    .limit(200)
    .select("name email phone company projectType budget description status createdAt");

  return response.json({ inquiries });
};

export const updateInquiryStatus = async (request, response) => {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({ message: "Inquiry storage is temporarily unavailable." });
  }

  const { status } = request.body;
  if (!statuses.includes(status)) {
    return response.status(400).json({ message: "Choose a valid inquiry status." });
  }
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(404).json({ message: "Inquiry not found." });
  }

  const inquiry = await ContactInquiry.findByIdAndUpdate(
    request.params.id,
    { status },
    { new: true, runValidators: true },
  ).select("status");

  if (!inquiry) {
    return response.status(404).json({ message: "Inquiry not found." });
  }

  return response.json({ inquiry });
};
