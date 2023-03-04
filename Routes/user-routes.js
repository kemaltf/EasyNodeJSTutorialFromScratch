import express from "express";
import shortid from "shortid";
const router = express.Router();

//buat user
router.route("/register").post(async (req, res) => {
  const credentials = req.body;
  credentials.id = shortid.generate();
  const { username, password } = credentials;
  if (!(username && password)) {
    return res.status(400).json({ message: "Username and password required!" });
  }
  try {
    // Retrieve existing data
    const existingData = await fetch("http://localhost:4000/users");
    const existingDataJson = await existingData.json();

    // Check if a user already exists with the same username
    const userExists = existingDataJson.some(
      (user) => user.username === username
    );
    if (userExists) {
      return res.status(400).json({ message: "Username already exists!" });
    }
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const responseData = await response.json();
    res.status(200).json({ message: "Username added!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

export default router;
