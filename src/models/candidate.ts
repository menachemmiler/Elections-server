import { Schema, Types, Document, model } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  image: string;
  votes: number;
}

const candidateSchema = new Schema<ICandidate>({
  name: {
    type: String,
    unique: true,
  },
  image: String,
  votes: {
    type: Number,
    default: 0,
  },
});

export default model<ICandidate>("Candidate", candidateSchema);
