import HttpError from "../helpers/HttpError.js"
import Users from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import gravatar from "gravatar"
import * as fs from "node:fs/promises"
import path from "node:path"
import Jimp from "jimp"



export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    const emailInLowerCase = email.toLowerCase();

    try {
        const user = await Users.findOne({ email: emailInLowerCase });

    if (user !== null) {
        next(HttpError(409, "Email in use"))
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
            name,
            email: emailInLowerCase,
            password: passwordHash,
            avatarURL: gravatar.url(emailInLowerCase, {s: '250', r: 'pg', d: 'retro'})
    });
        
        res.status(201).json({
        user:{
                email: emailInLowerCase,
                subscription: newUser.subscription,
                avatar: newUser.avatarURL
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

export const updateUserSub = async (req, res, next) => {
    const userId = req.user.id;
    const newSubscription = req.body

    try {
        
        const {name, email, subscription} = await Users.findByIdAndUpdate(userId, newSubscription, {new: true})
        
        res.status(200).json({
            user: {
                name,
                email,
                subscription
        }})

    } catch (error) {
        next(error)
    }
};

export const updateAvatar = async (req, res, next) => {

    if (req.file === undefined) {
        next(HttpError(400))
    }

    const userId = req.user.id;
    
    try {
        const image = await Jimp.read(req.file.path);
        image.resize(250, 250).write(req.file.path);

        await fs.rename(req.file.path, path.resolve("public/avatars", req.file.filename));

        const user = await Users.findByIdAndUpdate(userId,{avatarURL: `/avatars/${req.file.filename}`},{new: true});
         
        res.status(200).json({ avatarURL: user.avatarURL });


    } catch (error) {
        next(error)
    }
    
};