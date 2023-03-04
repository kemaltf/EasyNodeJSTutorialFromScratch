import express from "express";
import dotenv from "dotenv";
dotenv.config();

//setup routes
import studentsRouter from "../Routes/students-routes.js";
import usersRouter from "../Routes/user-routes.js";
import authRouter from "../auth/auth-routes.js";

const server = express();

server.use(express.json());

server.use("/auth", authRouter);
server.use("/students", studentsRouter);
server.use("/users", usersRouter);

export default server;
