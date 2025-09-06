import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}


export const generateToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

export const decodeToken = (token: string): jwt.JwtPayload | null => {
    try {
        return jwt.decode(token) as jwt.JwtPayload;
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
        return true; // If we can't decode or there's no expiration, consider it expired
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Check if the token is expired
}
