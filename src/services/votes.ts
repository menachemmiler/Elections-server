import Candidate from "../models/candidate";
import User from "../models/user";
import { VoteDto } from "../typs/dto/vote";

export const handleNewVote = async (vote: VoteDto) => {
  try {
    const { candidateId, userId } = vote;
    if (!candidateId || !userId) {
      throw new Error("candidateId & userId is required!");
    }

    const candidate = await Candidate.findById(candidateId);
    const user = await User.findById(userId);

    if (!candidate || !user) {
      throw new Error("Candidate or user not found!");
    }

    if (user.hasVoted) {
      await Candidate.findByIdAndUpdate(user.votedFor, {
        //אם הצביע כבר מבטלים את ההצבעה הישנה מכמות ההצבעות במועמד
        $inc: {
          votes: -1,
        },
      });
    }
    await Candidate.findByIdAndUpdate(vote.candidateId, {
      $inc: {
        votes: 1,
      },
    });
    await User.findByIdAndUpdate(vote.userId, {
      $set: {
        hasVoted: true,
        votedFor: vote.candidateId,
      },
    });

    return {
      status: "DONE",
    };
  } catch (err: any) {
    return {
      status: "ERROR",
      err: err as Error,
      message: err.message,
    };
  }
};
