const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Filed is mendatory");
  } else {
    const availableUser = await User.findOne({ email });

    if (availableUser) {
      res.status(400);
      throw new Error("User already register");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });
      if (user) {
        res.json({ _id: `${user._id}`, email: `${user.email}` });
        console.log("User created successfully..!!");
      } else {
        res.status(400);
        throw new Error("User not created");
      }
    }
  }
});
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Field is mendatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});
const userCurrent = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { userRegister, userLogin, userCurrent };
