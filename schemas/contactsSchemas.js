import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]+$/, "numbers").min(3).max(10).required()
})

export const updateContactSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]+$/, "numbers").min(3).max(10)
})