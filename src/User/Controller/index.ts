import { Request, Response } from 'express';

// Model
import { User } from '../Model';

export class UserController {

    public async createNewUser(req: Request, res: Response) {
        try {
            const newUser = new User(req.body);
            await newUser.save()
            res.status(201).json({ message: "User Created" });

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Error" });
        }
    }

    public async getExistingUserById(req: Request, res: Response) {
        try {
            const { userId } = req.params

            const user = await User.findById(userId).orFail();
            if (!user) throw new Error(`User with id:${userId} not found`)

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    public async updateExistingUserById(req: Request, res: Response) {
        try {
            const match = { _id: req.params.userId }
            const modifiedUser = await User.findOneAndUpdate(match, req.body, { new: true });

            res.status(200).json(modifiedUser);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    public async deleteExistingUserById(req: Request, res: Response) {
        try {
            const match = { _id: req.params.userId }
            const deletedUser = await User.deleteOne(match).orFail();

            res.status(200).json({ message: "User Deleted" });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

}