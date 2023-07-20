const carModel = require("../models/carModel");

exports.adminAddCar = async (req, res) => {
  try {
    const { name, type, price, sit, ac, carNumber } = req.body ?? {};
    if (!name || !type || !price || !sit || !ac || !carNumber)
      return res
        .status(200)
        .json({ status: "0", msg: "All Fields are required" });
    const addCar = await carModel.create({
      name,
      type,
      price,
      sit,
      ac,
      carNumber,
    });
    if (!addCar)
      return res.status(200).json({ status: 0, msg: "Data Not Saved" });
    return res.status(200).json({ status: 1, data: addCar });
  } catch (err) {
    console.log(err);
    response.status(400).json({ msg: "Something Went wrong" });
  }
};

exports.adminUpdateCar = async (req, res) => {
  try {
    const { name, type, price, sit, ac, carNumber } = req.body ?? {};
    const carUpdate = await carModel.findByIdAndUpdate(req.params.id);
    if (!carUpdate) {
      return res.status(200).json({ status: 0, msg: "car Not Found" });
    }
    const updateCar = await carModel.findByIdAndUpdate(req.params.id, {
      name: name,
      type: type,
      price: price,
      sit: sit,
      ac: ac,
      carNumber: carNumber,
    });
    console.log(updateCar);
    return res.status(200).json({ status: 1, msg: "Car successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong" });
  }
};

exports.adminDeleteCar = async (req, res) => {
  try {
    const deleteCar = await carModel.findById(req.params.id);
    if (!deleteCar)
      return res.status(200).json({ status: 0, msg: "Car Not Found" });

    await carModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 1, msg: "Car Delete Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "something went wrong" });
  }
};
