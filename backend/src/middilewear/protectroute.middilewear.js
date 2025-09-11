import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
dotenv.config()


export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      console.log("unauthorised------------------");
      return res.status(401).json({ message: "Unauthorised" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "You are not authorised" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error from protectroute---------catch---------", error);
    return res.status(400).json({ message: "User is unauthenticated to change the profile" });
  }
};
