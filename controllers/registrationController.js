const registrationModel = require("../models/registrationModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registration = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body ?? {};
    console.log(req.body);
    if (!name || !email || !phone || !password || !confirmPassword)
      return res.status(200).json({
        status: 0,
        msg: "All fields are required",
      });
    if (password !== confirmPassword)
      return res.status(200).json({
        status: 0,
        msg: "Password and confirm password does not match",
      });

    const checkUserPhone = await registrationModel.findOne({ phone: phone });
    if (checkUserPhone)
      return res.status(200).json({
        status: 0,
        msg: "Phone number already registered",
      });

    const checkUserEmail = await registrationModel.findOne({ email: email });
    if (checkUserEmail)
      return res.status(200).json({
        status: 0,
        msg: "Email already registered",
      });
    const registration = await registrationModel.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: "user",
    });
    if (!registration)
      return res.status(200).json({ status: 0, msg: "data not saved" });
    const token = await jwt.sign(
      {
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        role: registration.role,
      },
      process.env.JWT_KEY
    );
    return res.status(200).json({ status: 1, token, data: registration });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong");
  }
};
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body ?? {};
    if (!phone || !password)
      return res
        .status(200)
        .json({ status: 0, msg: "Phone and password are required" });
    const getUser = await registrationModel.findOne({ phone: phone });
    if (!getUser)
      return res
        .status(200)
        .json({ status: 0, msg: "phone Number is not register" });
    console.log(getUser);
    let passString = password.toString();
    const checkPassword = await bcrypt.compare(passString, getUser.password);
    if (!checkPassword)
      return res.status(200).json({ status: 0, msg: "password is not valid" });
    const token = await jwt.sign(
      {
        name: getUser.name,
        email: getUser.email,
        phone: getUser.phone,
        role: getUser.role,
      },
      process.env.JWT_KEY
    );
    return res.status(200).json({ status: 1, token, data: getUser });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong");
  }
};
