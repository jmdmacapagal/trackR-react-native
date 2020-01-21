const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();

router.post("/sign-up", async (request, response) => {
  const { email, password } = request.body;

  const user = new User({ email, password });
  await user.save();

  response.send("You made a request");
});

module.exports = router;
