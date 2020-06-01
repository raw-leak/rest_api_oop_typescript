import { Request, Response, NextFunction } from "express";
import { UserRoutes } from "../User/Routes";

export class Routes {

    public UserRoutes: UserRoutes = new UserRoutes()

    public routes(app): void {

        app.route('/user', this.UserRoutes)



    }

}