const express = require("express");
const router = express.Router();

//route = post api/appointments
//desc = make a new appointment
//access = private

router.post("/", (req, res) => {
  res.send("Make a new appointment");
});

router.get("/", (req, res) => {
  res.send("Get a users appointments");
});

router.get("/:id", (req, res) => {
  res.send(`get an appointment with id: ${req.params.id}`);
});

router.patch("/:id", (req, res) => {
  res.send(`update an appointment with id: ${req.params.id}`);
});
router.delete("/:id", (req, res) => {
  res.send(`Delete an appointment with id: ${req.params.id}`);
});

module.exports = router;
