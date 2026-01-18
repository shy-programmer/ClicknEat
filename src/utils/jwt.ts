import jwt from 'jsonwebtoken';


export interface payload {
    id: string;
    name: string;
    email: string;
    role: "admin" | "staff";
    isDeleted: boolean 
}

const secret = process.env.JWT_SECRET as string

const encode = (payload: payload) => {
  return jwt.sign(payload, secret, {expiresIn: "1h"});
};

const decode = (token: string) => {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }

    return decoded as payload
}

export { encode, decode }; 