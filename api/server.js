import express from "express";

//setup routes
import studentsRouter from "../Routes/students-routes.js";

const server = express();
server.use(express.json());

server.use("/students", studentsRouter);

export default server;
