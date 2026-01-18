import { decode } from '../utils/jwt.js';
export const AuthenticateStaff = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Not Authorized' });
        return;
    }
    try {
        const decoded = decode(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
export const AuthorizeAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};
//# sourceMappingURL=staff.middleware.js.map