import { trusted } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import Users from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { json } from "express";


export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    const emailInLowerCase = email.toLowerCase();

    try {
        const user = await Users.findOne({ email: emailInLowerCase });

    if (user !== null) {
        next(HttpError(409, "Email in use"))
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const {subscription} = await Users.create({
            name,
            email: emailInLowerCase,
            password: passwordHash,
    });
        
        res.status(201).json({
        user:{
                email: emailInLowerCase,
                subscription
             }
        })


    } catch (error) {
        next(error)
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const emailInLowerCase = email.toLowerCase();
    try {
        const user = await Users.findOne({ email: emailInLowerCase });

        if (user === null) {
            next(HttpError(401, "Email or password is wrong"))
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (isPasswordMatch === false) {
            next(HttpError(401, "Email or password is wrong"))
        }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" });

        await Users.findByIdAndUpdate(user._id, { token });

        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: emailInLowerCase,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error)
    }
};

export const logoutUser = async (req, res, next) => {
   
    try {
        await Users.findByIdAndUpdate(req.user.id, { token: null }); 
        
        res.status(204).end();
        
    } catch (error) {
        next(error)
    }

};

export const getUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.user.id);
 
        res.status(200).json({ email: user.email, subscription: user.subscription });

    } catch (error) {
        next(error)
    }


};