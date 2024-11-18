import Candidate from "../models/candidate";

export const initDatabase = async () => {
  try {
    const cands = [
      {
        name: "John",
        image: "https://randomuser.me/api/portraits/med/men/81.jpg",
      },
      {
        name: "Johnny",
        image: "https://randomuser.me/api/portraits/med/men/13.jpg",
      },
      {
        name: "Johnnyiahoo",
        image: "https://randomuser.me/api/portraits/med/men/83.jpg",
      },
      {
        name: "Johnniel",
        image: "https://randomuser.me/api/portraits/med/men/0.jpg",
      },
    ];

    const res = await Candidate.insertMany(cands);
    return res;
  } catch (err: any) {
    throw new Error(
      `Error accured while creating initial state of candidates ${err.message}`
    );
  }
};

export const getCandidateList = async () => {
  try {
    const list = await Candidate.find({});
    return list;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};
