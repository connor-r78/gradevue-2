const cors = require("cors");
const express = require("express");
const StudentVue = require('studentvue.js');

const app = express();

app.use(cors({ origin: "https://gradevue-2-f6274.web.app/" }));
app.use(express.json());

app.post("/api", async (req, res) => {
  const { district, username, password } = req.body;

  try {
    const client = await StudentVue.login(district, username, password);
    const gradebook = await client.getGradebook();
    res.json(gradebook);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Login failed"});
  }
});

app.listen(8080, "0.0.0.0");
