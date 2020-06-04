import { Request, Response, NextFunction } from "express";
import { UserController } from "../Controller";
import { UserDataValidation } from "../Validator";

export class UserRoutes {

    public UserController: UserController = new UserController()
    public UserDataValidation: UserDataValidation = new UserDataValidation()

    public routes(app): void {

        app.route('/user')
            .post(this.UserDataValidation.toCreateNewUser, this.UserController.createNewUser)

        app.route('/user/:userId')
            .get(this.UserController.getExistingUserById)
            .put(this.UserDataValidation.toUpdateExistingUser, this.UserController.updateExistingUserById)
            .delete(this.UserController.deleteExistingUserById)

    }

}