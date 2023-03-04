import dotenv from "dotenv";
import server from "./api/server.js";
dotenv.config();
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
