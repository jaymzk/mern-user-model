const express = require("express");
const router = express.Router();

//private , get to api/auth , get logged in user

router.get("/", (req, res) => {
  res.send("get logged in user");
});

//public , post to api/auth auth user and get token

router.post("/", (req, res) => {
  res.send("log in a user and get token");
});

module.exports = router;
