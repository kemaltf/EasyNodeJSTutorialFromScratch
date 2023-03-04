import express from "express";

//setup routes
import studentsRouter from "../Routes/students-routes.js";
import usersRouter from "../Routes/user-routes.js";

const server = express();
server.use(express.json());

server.use("/students", studentsRouter);
server.use("/users", usersRouter);

export default server;
