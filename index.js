import server from "./api/server.js";
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
