import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';

export class UserDataValidation {
  // Data validation rules

  private usernameRuleValidation: Function = (username) =>
    Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
    }).validateAsync({ username });

  private firstNameRuleValidation: Function = (firstName) =>
    Joi.object({
      firstName: Joi.string().alphanum().min(3).max(30).required(),
    }).validateAsync({ firstName });

  private lastNameRuleValidation: Function = (lastName) =>
    Joi.object({
      lastName: Joi.string().alphanum().min(3).max(30).required(),
    }).validateAsync({ lastName });

  private emailRuleValidation: Function = (email) =>
    Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'es', 'org'] },
        })
        .required(),
    }).validateAsync({ email });

  // Password requirements

  // min 6 characters
  // max 30 characters
  // must contain at least 1 uppercase or lowercase letter
  // must contain at least 1 number
  // may contain special characters like !@#$%^&*()_+

  private passwordRuleValidation: Function = (password, repeat_password) =>
    Joi.object({
      password: Joi.string()
        .pattern(
          new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,30}$')
        )
        .required()
        .messages({
          'string.pattern.base': `"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number`,
        }),

      repeat_password: Joi.valid(Joi.ref('password')).required(),
    }).validateAsync({ password, repeat_password });

  private idRuleValidation: Function = (id) =>
    Joi.object({
      id: Joi.string()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
        .required()
        .messages({
          'string.pattern.base': `"id" fails to match the required format`,
        }),
    }).validateAsync({ id });

  // Data validation methods

  public toCheckBodyEssentialInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, firstName, lastName, email } = req.body;

      await this.usernameRuleValidation(username);
      await this.firstNameRuleValidation(firstName);
      await this.lastNameRuleValidation(lastName);
      await this.emailRuleValidation(email);

      next();
    } catch (err) {
      res.status(400).json({ message: err.message }).end();
    }
  };

  public toCheckUserPasswords = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, repeat_password } = req.body;

      await this.passwordRuleValidation(password, repeat_password);

      next();
    } catch (err) {
      res.status(400).json({ message: err.message }).end();
    }
  };

  public toCheckIdFormat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;

      await this.idRuleValidation(userId);

      next();
    } catch (err) {
      res.status(400).json({ message: err.message }).end();
    }
  };
}
