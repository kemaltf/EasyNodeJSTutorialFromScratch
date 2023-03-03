import express from "express";
import shortid from "shortid";
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

// get all data
app.get("/students", (req, res) => {
  fetch("http://localhost:4000/students")
    .then((dataObj) => {
      return dataObj.json();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
// create data
app.post("/students", (req, res) => {
  const newPost = req.body;
  newPost.id = shortid.generate();
  fetch("http://localhost:4000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((data) => {
      res.send("data added");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
// get specific data
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  fetch(`http://localhost:4000/students/${id}`)
    .then((dataObj) => {
      return dataObj.json();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
// update data
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  fetch(`http://localhost:4000/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((dataObj) => {
      return dataObj.json();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/", (req, res) => {
  res.send("Ini home");
});
