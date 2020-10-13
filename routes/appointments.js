const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

router.post(
  "/",
  [
    auth,
     [
       check("reference","Reference is required").not().isEmpty(),
       check("date", "Date is required").not().isEmpty(),
       check("room", "Room is required").not().isEmpty(),
       check("startTime", "Date is required").not().isEmpty(),
       check("endTime", "Date is required").not().isEmpty(),
    ],
  ],
  
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reference, date, room, startTime, endTime, notes, available } = req.body;

    

    try {
    
      const newAppointment = new Appointment({
        reference,
        date,
        room,
        startTime,
        endTime,
        notes,
        available,
        user: req.user.id,
      });

      const appointment = await newAppointment.save();

      res.json(appointment);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//get users own appointments

router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Error");
  }
});

//allow admins to pass in a user id and get their appointments

router.get("/:id", auth, async (req, res) => {
  //first check if requesting user is admin
  if (req.user.admin === false || req.user.admin === "false") {
    return res
      .status(400)
      .json({ errors: [{ msg: "User does not have admin privileges" }] });
  }

  try {
    const appointments = await Appointment.find({ user: req.params.id }).sort({
      date: -1,
    });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Error");
  }
});

//get a users appointments on a certain day
router.get("/date/:date", auth, async (req, res)=> {

  try {

    const paramDate = new Date(req.params.date)

    const reqYear = paramDate.getFullYear()
    const reqMonths = paramDate.getMonth()
    const reqDay = paramDate.getDate()
    const nextDay = paramDate.getDate() + 1

    const queryDate = new Date(reqYear, reqMonths,reqDay, 0,0,0,0)
    const queryNextDay = new Date(reqYear, reqMonths,nextDay, 0,0,0,0)
    

    console.log("getting appotintments by date", queryDate, queryNextDay)
    // const appointments = await Appointment.find({ date: queryDate }).sort({
    //   startTime: -1,
    // });
    const appointments = await Appointment.find({date: { $gte: queryDate, $lte: queryNextDay}}).sort({
      startTime: -1,
    });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Error");
  }
});



router.put("/:id", auth, async (req, res) => {
  const { date, room, startTime, endTime, notes, available } = req.body;

  //appointments object
  const appointmentFields = {};
  if (reference) appointmentFields.reference = reference;
  if (date) appointmentFields.date = date;
  if (room) appointmentFields.room = room;
  if (startTime) appointmentFields.startTime = startTime;
  if (endTime) appointmentFields.endTime = endTime;
  if (notes) appointmentFields.notes = notes;
  if (available) appointmentFields.available = available;

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "appointment not found" });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: appointmentFields },
      { $new: true }
    );
    appointment = await Appointment.findById(req.params.id);
    res.json(appointment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "appointment not found" });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    await Appointment.findByIdAndRemove(req.params.id);

    res.json({ msg: "Appointment removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Error");
  }
});

module.exports = router;
