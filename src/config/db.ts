import { connect } from "mongoose";

export const connectToMongo = async () => {
  try {
    await connect(process.env.DB_URI as string);
  } catch (err) {
    console.log("Can't connect to mongo", err);
  }
};
