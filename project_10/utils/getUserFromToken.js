import JWT from "jsonwebtoken";

export const getUserFromToken = (token) => {
    try {
        return JWT.verify(token, process.env.JSON_SIGNATURE)
    } catch (error) {
        return null;
    }
};