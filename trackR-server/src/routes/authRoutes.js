const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();

router.post("/sign-up", (request, response) => {
  response.send("You made a request");
});

module.exports = router;
