const jwt = require("jsonwebtoken");

exports.adminVerify = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token)
      return res.status(200).json({ status: 0, msg: "Token is required" });
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode)
      return res.status(200).json({ status: 0, msg: "Token is not valid" });
    if (decode.role == "admin") {
      req.user = decode;
      next();
    }
    console.log(decode);
  } catch (err) {
    console.log(err);
    response.status(400).json({ msg: "something went wrong" });
  }
};
