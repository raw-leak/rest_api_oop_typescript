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
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es', 'org'] },
      }),
    }).validateAsync({ email });

  private passwordRuleValidation: Function = (password, repeat_password) =>
    Joi.object({
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

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
