import { Request, Response, NextFunction } from "express";
import { UserRoutes } from "../api/components/User/Routes";

export class Routes {

    public UserRoutes: UserRoutes = new UserRoutes()

    public routes(app): void {

        app.route('/user', this.UserRoutes)



    }

}