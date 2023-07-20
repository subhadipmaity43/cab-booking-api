const express = require("express");
const router = express.Router();
const {
  adminAddCar,
  adminUpdateCar,
  adminDeleteCar,
} = require("../controllers/carController");
const { adminVerify } = require("../middleware/tokenVerify");
router.post("/addcar", adminVerify, adminAddCar);
router.put("/updatecar/:id", adminVerify, adminUpdateCar);
router.delete("/deletecar/:id", adminVerify, adminDeleteCar);
module.exports = router;
