import express from "express";
import shortid from "shortid";
import bcrypt from "bcryptjs";
const router = express.Router();

//buat user
router.route("/register").post(async (req, res) => {
  const credentials = req.body;
  credentials.id = shortid.generate();
  const { username, password } = credentials;

  const hash = await bcrypt.hash(credentials.password, 12);
  credentials.password = hash;
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
    res.status(200).json({ message: "Username added!" });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({ message: "Username and password required!" });
  }
  try {
    const response = await fetch(
      `http://localhost:4000/users?username=${username}`
    );
    const data = await response.json();
    const user = data[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return res.status(200).json({ message: `welcome ${user.username}` });
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});
export default router;
