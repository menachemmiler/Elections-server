import request from "supertest";
import { app, io, server } from "./app";
import mongoose from "mongoose";
import { LoginDto, RegisterDto } from "./typs/dto/user";
import { ICandidate } from "./models/candidate";
import { VoteDto } from "./typs/dto/vote";

let testUser: any;

let allCandidates: ICandidate[];

let token: string;

beforeAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.createConnection();
});

// after all
afterAll(async () => {
  await mongoose.connection.close();
  await io.close();
  await server.close();
});

describe("test to /api/users", () => {
  test("seed", async () => {
    const res = await request(app).post("/api/candidates/sid");
    allCandidates = res.body;
    expect(res.status).toBe(201);
  });

  test("register test", async () => {
    const register: RegisterDto = {
      isAdmin: false,
      username: "meny",
      password: "5050",
    };
    const res = await request(app).post("/api/users/register").send(register);
    expect(res.status).toBe(201);
    testUser = await res.body;
  });

  test("login test", async () => {
    const loginDto: LoginDto = {
      username: testUser.username,
      password: "5050",
    };
    const res = await request(app).post("/api/users/login").send(loginDto);
    expect(await res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("vote test", async () => {
    const vote: VoteDto = {
      candidateId: allCandidates[0]._id as string,
      userId: testUser._id,
    };
    const res = await request(app).post("/api/votes").set("Authorization", `${token}`).send(vote);
    expect(await res.status).toBe(200);
  });
});
