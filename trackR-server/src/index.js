require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:4bpg8a7x@trackr-prqas.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Atlas!");
});

mongoose.connection.on("error", err => {
  console.error("Error connecting to Atlas", err);
});

app.get("/", requireAuth, (request, response) => {
  response.send(`Your email: ${request.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
