import { Request, Response } from "express";
import { handleNewVote } from "../services/votes";
import { VoteDto } from "../typs/dto/vote";


export const vote = async (req: Request<any, any, VoteDto>, res: Response) => {
  try {
    const data = await handleNewVote(req.body);
    res.json({ data }).status(200);
  } catch (err) {
    res.status(500).json({ err });
  }
};
