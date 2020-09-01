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
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilege1: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilege2: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilege3: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilege4: {
    type: Boolean,
    required: true,
    default: false,
  },
  privilege5: {
    type: Boolean,
    required: true,
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
