const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(authRoutes);

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

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
