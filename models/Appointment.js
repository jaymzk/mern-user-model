const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  date: {
    type: Date,
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
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
