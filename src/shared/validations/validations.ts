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

const signUpValidation = () => Joi.object({
  firstName: Joi.string().max(30).required().messages({
    'string.empty': 'First name is required',
    'string.max': 'First name must be less than or equal to 30 characters',
  }),
  lastName: Joi.string().max(30).required().messages({
    'string.empty': 'Last name is required',
    'string.max': 'Last name must be less than or equal to 30 characters',
  }),
  username: Joi.string().max(30).required().messages({
    'string.empty': 'Username is required',
    'string.max': 'Username must be less than or equal to 30 characters',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.any().custom((value, helpers) => {
    if (!value) {
        // Directly use helpers.error() to specify a custom error code and message
        return helpers.error('any.required', { message: 'Confirm password is required' });
    }
    if (helpers.state.ancestors[0].password !== value) {
        // Use a different custom error code if desired, or reuse 'any.required' for simplicity
        return helpers.error('any.only', { message: 'Passwords do not match' });
    }
    return value; // Value is valid
}).messages({
    'any.required': 'Confirm password is required',
    'any.only': 'Passwords do not match',
}),
});


export {
  loginValidation,
  signUpValidation
}