const Order = require("../models/order.model");

exports.getAll = async (req, res) => {
  try {
    const result = await Order.find();
    console.log(result);
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { name, surname, email, phone } = req.body.userInformations;
    const {
      shipmentName,
      shipmentSurname,
      country,
      region,
      street,
      building,
      apartament,
      city,
      zipCode,
      shipmentMethod,
      paymentMethod,
    } = req.body.shipmentInformations;
    const { items } = req.body;
    const { comments } = req.body.comments;

    if (
      name &&
      surname &&
      email &&
      phone &&
      shipmentName &&
      shipmentSurname &&
      country &&
      region &&
      street &&
      building &&
      city &&
      zipCode &&
      shipmentMethod &&
      paymentMethod &&
      items
    ) {
      const newOrder = new Order({
        userInformations: {
          name,
          surname,
          email,
          phone,
        },
        shipmentInformations: {
          shipmentName,
          shipmentSurname,
          country,
          region,
          street,
          building,
          apartament,
          city,
          zipCode,
          shipmentMethod,
          paymentMethod,
        },
        comments: {
          comments,
        },
        items,
      });
      console.log(newOrder);
      await newOrder.save();
      res.json({ message: "OK", newOrder });
    } else res.status(404).json({ message: "not found..." });
  } catch (err) {
    res.status(500).json(err);
  }
};
