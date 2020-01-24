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

router.post("/tracks", async (request, response) => {
  const { name, locations } = request.body;

  if (!name || !locations) {
    return response
      .status(422)
      .send({ error: "You must provide name and locations" });
  }

  try {
    const track = new Track({
      name,
      locations,
      userId: request.user._id
    });

    await track.save();
    response.send(track);
  } catch (err) {
    response.status(422).send({ error: err.message });
  }
});

module.exports = router;
