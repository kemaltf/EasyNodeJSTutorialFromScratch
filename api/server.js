import express from "express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

//setup routes
import studentsRouter from "../Routes/students-routes.js";
import usersRouter from "../Routes/user-routes.js";
import authRouter from "../auth/auth-routes.js";
import restricted from "../auth/restricted-middleware.js";

const server = express();

const sessionConfig = {
  name: "userAuth", // name of the cookie
  secret: process.env.COOKIE_SECRET, // secrete that makes the cookie
  cookie: {
    maxAge: 1000 * 60 * 60, // time span of the cookie (ms) in the example is 1 hour (3600000 ms)
    secure: false, // for dev set false (http), for prod set true for only https access (https)
    httpOnly: true, // true means no acccess from javascript
  },
  resave: false,
  saveUninitialized: true, // in prod set to false (GDPR laws)
};
server.use(express.json());
server.use(session(sessionConfig));

server.use("/auth", authRouter);
server.use("/students", restricted, studentsRouter);
server.use("/users", restricted, usersRouter);

export default server;
