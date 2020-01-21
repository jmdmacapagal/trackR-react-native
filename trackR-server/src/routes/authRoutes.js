const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();

router.post("/sign-up", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = new User({ email, password });
    await user.save();
  } catch (error) {
    return response.status(422).send(error.errmsg);
  }

  response.send("You made a request");
});

module.exports = router;
