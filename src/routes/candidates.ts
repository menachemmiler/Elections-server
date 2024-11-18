import { Request, Response } from "express";
import { getCandidateList, initDatabase } from "../services/candidates";

export const sid = async (req: Request, res: Response) => {
  try {
    const resulte = await initDatabase();
    res.status(201).json(resulte);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const getList = async (req: Request, res: Response) => {
  try {
    const list = await getCandidateList();
    res.json(list);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
