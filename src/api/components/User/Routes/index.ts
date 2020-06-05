import { UserController } from '../Controller';
import { UserDataValidation } from '../Validator';

export class UserRoutes {
  public UserController: UserController = new UserController();
  public UserDataValidation: UserDataValidation = new UserDataValidation();

  public routes(app): void {
    app
      .route('/user')
      .post(
        this.UserDataValidation.toCheckBodyEssentialInformation,
        this.UserDataValidation.toCheckUserPasswords,
        this.UserController.createNewUser
      );

    app
      .route('/user/:userId')
      .get(
        this.UserDataValidation.toCheckIdFormat,
        this.UserController.getExistingUserById
      )
      .put(
        this.UserDataValidation.toCheckBodyEssentialInformation,
        this.UserDataValidation.toCheckIdFormat,
        this.UserController.updateExistingUserById
      )
      .delete(
        this.UserDataValidation.toCheckIdFormat,
        this.UserController.deleteExistingUserById
      );
  }
}
