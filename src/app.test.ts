import request from "supertest";
import { app, io, server } from "./app";
import mongoose from "mongoose";
import { LoginDto, RegisterDto } from "./typs/dto/user";



const testUser: RegisterDto = {
  username: "שלמה",
  password: "5050",
  isAdmin: true,
};

const beforeAll = async ()  => {

}


describe("test to /api/users", () => {
  test("register test", async () => {
    const register: RegisterDto = {
      isAdmin: testUser.isAdmin,
      username: testUser.username,
      password: testUser.password,
    };
    const res = await request(app).post("/api/users/register").send(register);
    expect(res.status).toBe(201);
  });
  test("login test", async () => {
    const loginDto: LoginDto = {
      username: testUser.username,
      password: testUser.password,
    };
    const res = await request(app).post("/api/users/login").send(loginDto);
    expect(await res.status).toBe(200);
    afterAll();
  });
});



// after all
const afterAll = async () => {
  await mongoose.connection.close();
  await io.close();
  await server.close();
};

