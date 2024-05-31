import Joi from "joi"

export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business')
});

export const verificationEmailSchema = Joi.object({
    email: Joi.string().email().required()
})