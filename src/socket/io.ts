import { io } from "../app";
import jwt from "jsonwebtoken";
import User from "../models/user";

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח
  socket.on("login", () => {
    console.log(`a user is login`);
  });
  socket.on("newVote", async (token: string, callback) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const userId = (decoded as any).user_id;
      const updatedUser = await User.findById(userId);
      if (updatedUser) {
        callback({ status: "success", user: updatedUser });
      } else {
        callback({ status: "error", message: "User not found" });
      }
    } catch (err: any) {
      console.error("Token error:", err.message);
      callback({ status: "error", message: "Invalid token" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
