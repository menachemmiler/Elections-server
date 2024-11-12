import { Types } from "mongoose";

export interface VoteDto {
  userId: string | Types.ObjectId;
  candidateId: string | Types.ObjectId;
}
