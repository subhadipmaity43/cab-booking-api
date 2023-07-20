const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registrationScheama = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Name is required"],
  },
  email: {
    type: String,
    require: ["true", "Email is required"],
  },
  phone: {
    type: Number,
    required: ["true", "Phone is required"],
  },
  password: {
    type: String,
    required: ["true", "Password is required"],
  },
  role: {
    type: String,
    required: ["true", "Role is required"],
  },
});
// Encrypt password
registrationScheama.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const registrationModel = mongoose.model("registration", registrationScheama);
module.exports = registrationModel;
