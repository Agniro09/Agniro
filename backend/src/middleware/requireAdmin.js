import jwt from "jsonwebtoken";
import config from "../config/config.js";

const requireAdmin = (request, response, next) => {
  const token = request.cookies.admin_session;

  if (!token || !config.jwtSecret) {
    return response.status(401).json({ message: "Please sign in to continue." });
  }

  try {
    const session = jwt.verify(token, config.jwtSecret);
    request.admin = { email: session.email };
    return next();
  } catch {
    return response.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
};

export default requireAdmin;
