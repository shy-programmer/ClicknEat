export interface payload {
    id: string;
    name: string;
    email: string;
    role: "admin" | "staff";
    isDeleted: boolean;
}
declare const encode: (payload: payload) => string;
declare const decode: (token: string) => payload;
export { encode, decode };
//# sourceMappingURL=jwt.d.ts.map