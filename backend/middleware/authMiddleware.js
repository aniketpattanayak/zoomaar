import jwt from "jsonwebtoken";

export const verifySeller = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "seller") return res.status(403).json({ message: "Unauthorized" });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
