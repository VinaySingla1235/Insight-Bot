import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { errorHandler } from "./errors.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return next(errorHandler(401, "Token not recieved"));
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return next(errorHandler(401, "Token Expired"));
            }
            else {
                resolve();
                res.locals.jwtData = success;
                console.log("Token verification successfull");
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map