const express = require("express");
const router = express.Router();

//public , create a user

router.post("/", (req, res) => {
  res.send("Create a new user");
});

//private , allow admins to get all users if it's that sort of app,

router.get("/", (req, res) => {
  res.send("get all users");
});

//private, allow a user to retrieve their account

router.get("/me/:id", (req, res) => {
  res.send(`get a single user: ${req.params.id} `);
});

//private, edit user eg change password

router.put("/:id", (req, res) => {
  res.send(`update user: ${req.params.id}`);
});

//private, delete user

router.delete("/:id", (req, res) => {
  res.send(`delete user ${req.params.id}`);
});

module.exports = router;
