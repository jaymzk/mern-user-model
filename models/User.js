const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  userType: {
    type: String,
    default: "patient"
  },
  calendarPreference: {
    type: String,
    default: "week"
  },
  admin: {
    type: Boolean,
    default: false,
  },
  privilege1: {
    type: Boolean,
    default: false,
  },
  privilege2: {
    type: Boolean,
    default: false,
  },
  privilege3: {
    type: Boolean,
    default: false,
  },
  privilege4: {
    type: Boolean,
    default: false,
  },
  privilege5: {
    type: Boolean,
    default: false,
  },
  favoriteColor: {
    type: String,
    default: "#4a69bd",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
