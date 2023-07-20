const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const registrationRoute = require("./routes/registrationRoute");
const carRoute = require("./routes/carRoute");
dotenv.config();
const index = express();
index.use(express.json());

index.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
index.use("/", registrationRoute);
index.use("/car", carRoute);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection established");
  })
  .catch((error) => {
    console.log(error);
  });
