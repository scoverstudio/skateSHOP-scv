const initialState = {
  categories: [
    {
      id: "skateboards",
      elements: ["decks", "wheels", "bearings", "tracks", "grips"],
    },
    {
      id: "tshirts",
      elements: ["tops", "oversizes", "shorts"],
    },
  ],

  categoryNames: ["skateboards", "tshirts"],

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
