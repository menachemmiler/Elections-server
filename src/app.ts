import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersController from "./controllers/users";
import adminController from "./controllers/admin";
import votesController from "./controllers/votes";
import candidatesController from "./controllers/candidates";
import { connectToMongo } from "./config/db";
dotenv.config({
  path: process.env.NODE_ENV == "stg" ? "./.env.staging" : "./.env",
});

const PORT = process.env.PORT || 3000;

import http from "http";
import { Server } from "socket.io";

export const app = express();
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

app.use("/api/users", usersController);
app.use("/api/admin", adminController);
app.use("/api/votes", votesController);
app.use("/api/candidates", candidatesController);

server.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
});
