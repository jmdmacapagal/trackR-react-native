const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (request, response) => {
  const id = request.user._id;
  const tracks = await Track.find({ userId: id });

  response.send(tracks);
});

module.exports = router;
