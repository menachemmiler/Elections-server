import { io } from "../app";



io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח
  // כאן ניתן להוסיף גם קוד נוסף אם יש צורך
  socket.on("login", () => {
    console.log(`a user is login`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
