import Joi from "joi";

const getTaskSchema = Joi.object({
    title:Joi.string().min(2).required().messages({
        "string:base":"Title should not be empty or should be least 2 letters"
    }),
    completed: Joi.boolean().optional()
})

export {getTaskSchema};