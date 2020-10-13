const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  reference: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  dateStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
