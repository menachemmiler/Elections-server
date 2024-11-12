import express from "express";
import cors from "cors";
import "dotenv/config";
import usersController from "./controllers/users";
import adminController from "./controllers/admin";
import votesController from "./controllers/votes";
import candidatesController from "./controllers/candidates";
import { connectToMongo } from "./config/db";

const PORT = process.env.PORT || 3000;

const app = express();
connectToMongo()

app.use(express.json());
app.use(cors());

app.use("/api/users", usersController);
app.use("/api/admin", adminController);
app.use("/api/votes", votesController);
app.use("/api/candidates", candidatesController);

app.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
});
