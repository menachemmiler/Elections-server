import request from "supertest";
import { app, io, server } from "./app";
import mongoose from "mongoose";

test("test get /ping", async () => {
  const res = await request(app).get("/ping");
  expect(res.status).toBe(200);
  expect(res.text).toBe("ping");
  await afterAll();
});


//after 
const afterAll = async () => {
  await mongoose.connection.close();
  await io.close();
  await server.close();
};
