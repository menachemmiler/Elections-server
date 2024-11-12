import { Router } from "express";
import { vote } from "../routes/votes";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/", verifyUser, vote);

export default router;
