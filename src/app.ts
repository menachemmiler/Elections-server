import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersController from "./controllers/users";
import adminController from "./controllers/admin";
import votesController from "./controllers/votes";
import candidatesController from "./controllers/candidates";
dotenv.config({
  path: process.env.NODE_ENV == "stg" ? "./.env.staging" : "./.env",
});

const PORT = process.env.PORT || 3000;

import http from "http";
import { Server } from "socket.io";

export const app = express();
import { connectToMongo } from "./config/db";
connectToMongo();

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // כתובת הלקוח
    methods: "*",
  },
});
import "./socket/io"; //מייבא את הקובץ של הסוקטים

app.use(express.json());
app.use(cors());

// io.emit("voteUpdate", getCandidateList); //?
app.use("/api/users", usersController);
app.use("/api/admin", adminController);
app.use("/api/votes", votesController);
app.use("/api/candidates", candidatesController);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("ping");
});

server.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
});
