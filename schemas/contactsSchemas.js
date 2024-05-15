import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(15).required()
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]+$/, "numbers").min(3).max(10)
})

export const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required()
})