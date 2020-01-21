const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const router = express.Router();

router.post("/sign-up", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "YABA_YODA");
    response.send({ token });
  } catch (error) {
    return response.status(422).send(error.errmsg);
  }
});

module.exports = router;
