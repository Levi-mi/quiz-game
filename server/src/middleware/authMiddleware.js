import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.access_token || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const bearerToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};

export function authAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
}

export default authMiddleware;
