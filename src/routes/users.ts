import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../typs/dto/user";
import { createNewUser, profileService, userLogin } from "../services/users";

export const login = async (req: Request<LoginDto>, res: Response) => {
  try {
    const loggedUser = await userLogin(req.body);
    res.status(200).json(loggedUser);
  } catch (err) {
    res.status(400).json((err as Error).message + "routes/users.ts");
  }
};

export const register = async (req: Request<any, any , RegisterDto>, res: Response) => {
  try {
    console.log("req.body= ", req.body);
    const freshlyCreatedUser = await createNewUser(req.body);
    res.status(201).json(freshlyCreatedUser);
  } catch (err:any) {
    res.status(400).json(err.message);
  }
};


export const profile = async (req: Request, res: Response) => {
  try {
    const resulte = await profileService((req as any).user);
    res.status(200).json(resulte);
  } catch (err:any) {
    res.status(400).json(err.message);
  }
};

