const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userInformations: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  shipmentInformations: {
    shipmentName: { type: String, required: true },
    shipmentSurname: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
    apartament: { type: Number },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    shipmentMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  items: { type: Object },
});

module.exports = mongoose.model("Order", orderSchema);
