import HttpError from "../helpers/HttpError.js";
import mongoose from "mongoose";



const idValidation = async (req, res, next) => {
    const { id } = req.params;
    const isValid = mongoose.isValidObjectId(id);
    
    if (!isValid) {
        next(HttpError(400, "invalid id"))
    };

    next();
}


export default idValidation