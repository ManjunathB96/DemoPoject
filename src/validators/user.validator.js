import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    refreshToken: Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
