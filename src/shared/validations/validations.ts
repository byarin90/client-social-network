import Joi from 'joi';

const loginValidation = () => {
    return Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required()
            .messages({
                'string.email': 'Please enter a valid email',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
        password: Joi.string().required()
            .messages({
                'string.empty': 'Password is required',
                'any.required': 'Password is required'
            }),

    }) as Joi.ObjectSchema;
};


export { 
    loginValidation,
}