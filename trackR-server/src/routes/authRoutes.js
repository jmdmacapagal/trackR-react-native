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

router.post("/sign-in", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(422)
      .send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return response.status(422).send({ error: "Invalid password or email." });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, "YABA_YODA");
    response.send({ token });
  } catch (err) {
    return response.status(422).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
