const initialState = {
  categories: [
    { id: "deck", name: "deck" },
    { id: "wheel", name: "wheel" },
    { id: "bearing", name: "bearing" },
    { id: "track", name: "track" },
    { id: "grip", name: "grip" },
  ],
  products: [],
  cart: {
    products: [],
    subtotal: 0,
    freeDelivery: 150,
    deliveryCost: 20,
  },
  orders: [
    {
      userInformations: {
        name: "Krystian",
        surname: "Matkowski",
        email: "scv@gmail.com",
        phoneNumber: "697740650",
      },
      shipmentInformations: {
        name: "Krystian",
        surname: "Matkowski",
        country: "Poland",
        region: "Dolny Slask",
        street: "Kaczencowa",
        building: 8,
        apartament: 2,
        city: "Polkowice",
        zipCode: "59-101",
      },
    },
  ],
};

export default initialState;
