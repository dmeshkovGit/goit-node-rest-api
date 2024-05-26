import jwt from "jsonwebtoken"
import Users from "../models/users.js"
import HttpError from "../helpers/HttpError.js";



const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (typeof authHeader === "undefined") {
        next(HttpError(401, "Not authorized"))
    };

    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"))
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
        if (err) {
            next(HttpError(401, "Not authorized"))
        };

        try {
           
            const user = await Users.findById(decode.id)
            if (user === null) {
                next(HttpError(401, "Not authorized"))
            };
        
            if (user.token !== token) {
                next(HttpError(401, "Not authorized"))
            };

            req.user = {
                id: user._id,
                name: user.name,
            };
            
            next();

        } catch (error) {
            next(error)
        };
    });

};

export default auth;