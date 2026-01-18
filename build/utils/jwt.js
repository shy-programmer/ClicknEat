import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;
const encode = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
};
const decode = (token) => {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }
    return decoded;
};
export { encode, decode };
//# sourceMappingURL=jwt.js.map