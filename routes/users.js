const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");

//public , create a user

router.post(
  "/",
  [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      phone,
      admin,
      privilege1,
      privilege2,
      privilege3,
      privilege4,
      privilege5,
      favoriteColor,
    } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }
      //encrypt the password
      //return jsonwebtoken
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

    user = new User({
      firstName,
      lastName,
      userName,
      email,
      password,
      phone,
      admin,
      privilege1,
      privilege2,
      privilege3,
      privilege4,
      privilege5,
      favoriteColor,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  }
);

//get logged in user
router.get("/", auth, async (req, res) => {
  try {
    /*const user = await User.findById(req.user.id).select([
      "-password",
      "-privilege1",
      "-privilege2",
      "-privilege3",
      "-privilege4",
      "-privilege5",
      "-favoriteColor",
    ]);
    const adminUser = await User.findById(req.user.id).select([
      "-password",
      "-email",
      "-phone",
      "-firstName",
      "-lastName",
      "-date",
      "-privilege1",
      "-privilege2",
      "-privilege3",
      "-privilege4",
      "-privilege5",
      "-favoriteColor",
    ]);
    res.json(adminUser);
    */
    const user = await User.findById(req.user.id).select(["-password"]);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//private , allow admins to get all users if it's that sort of app,

router.get("/all", auth, async (req, res) => {
  try {
    let requestingUser = await User.findById(req.user.id).select([
      "-password",
      "-email",
      "-phone",
      "-firstName",
      "-lastName",
      "-date",
      "-privilege1",
      "-privilege2",
      "-privilege3",
      "-privilege4",
      "-privilege5",
      "-favoriteColor",
    ]);
    let isAdmin = !!requestingUser.admin; // turn string into bool
    if (!isAdmin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not have admin privileges" }] });
    }
    const allUsers = await User.find({})
      .select("-password")
      .sort({ lastName: 1 }); //sort lastname alphabetically
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//private, edit user eg change password

router.put("/:id", auth, async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    phone,
    admin,
    privilege1,
    privilege2,
    privilege3,
    privilege4,
    privilege5,
    favoriteColor,
  } = req.body;

  //build a user object based on the fields submitted
  const updateFields = {};
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (userName) updateFields.userName = userName;
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (password) {
    const salt = await bcrypt.genSalt(10);

    updateFields.password = await bcrypt.hash(password, salt);
  }
  if (admin) updateFields.admin = admin;
  if (privilege1) updateFields.privilege1 = privilege1;
  if (privilege2) updateFields.privilege2 = privilege2;
  if (privilege3) updateFields.privilege3 = privilege3;
  if (privilege4) updateFields.privilege4 = privilege4;
  if (privilege5) updateFields.privilege5 = privilege5;
  if (favoriteColor) updateFields.favoriteColor = favoriteColor;

  try {
    //see if requesting user is an admin

    let requestingUser = await User.findById(req.user.id).select([
      "-password",
      "-email",
      "-phone",
      "-firstName",
      "-lastName",
      "-date",
      "-privilege1",
      "-privilege2",
      "-privilege3",
      "-privilege4",
      "-privilege5",
      "-favoriteColor",
    ]);
    let isAdmin = !!requestingUser.admin; // turn string into bool

    let userToUpdate = await User.findById(req.params.id);

    if (!userToUpdate) return res.status(404).json({ msg: "User not found" });

    if (userToUpdate.id.toString() !== req.user.id && !isAdmin) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    userToUpdate = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.json(userToUpdate);
    //
  } catch (error) {
    console.error(error.message);
  }
});

//private, delete user

router.delete("/:id", auth, async (req, res) => {
  try {
    //see if requesting user is an admin

    let requestingUser = await User.findById(req.user.id).select([
      "-password",
      "-email",
      "-phone",
      "-firstName",
      "-lastName",
      "-date",
      "-privilege1",
      "-privilege2",
      "-privilege3",
      "-privilege4",
      "-privilege5",
      "-favoriteColor",
    ]);
    let isAdmin = !!requestingUser.admin; // turn string into bool

    let userToDelete = await User.findById(req.params.id);

    if (!userToDelete) return res.status(404).json({ msg: "User not found" });

    if (userToDelete.id.toString() !== req.user.id && !isAdmin) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    userToDelete = await User.findByIdAndDelete(req.params.id);
    res.json(userToDelete);
    //
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
