import Joi from 'joi';

export const emailValidator = Joi.string()
  .required()
  .min(5)
  .max(100)
  .email({ minDomainSegments: 2 })
  .trim();

export const nameValidator = Joi.string().required().min(4).max(50).trim();

export const passwordValidator = Joi.string().required().min(6).max(50);

/**
 * @param user - express user
 */
export const validateUserSignup = user => {
  const SignupSchema = Joi.object({
    name: nameValidator,
    email: emailValidator,
    password: passwordValidator,
    // confirmPassword: passwordValidator.valid(Joi.ref('password')),
    createdAt: Joi.date().default(Date.now),
  });
  return SignupSchema.validate(user);
};

/**
 * @param user - express user
 */
export const validateUserLogin = user => {
  const emailSchema = Joi.object({
    email: emailValidator,
    password: passwordValidator,
  });
  return emailSchema.validate(user);
};

/**
 * @param name
 */
export const validateName = name => {
  const nameSchema = nameValidator;
  return nameSchema.validate(name);
};

/**
 * @param email
 */
export const validateEmail = email => {
  const emailSchema = emailValidator;
  return emailSchema.validate(email);
};
