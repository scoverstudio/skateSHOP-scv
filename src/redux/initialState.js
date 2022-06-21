const initialState = {
  // categories: {
  //   skateboard: [
  //     { id: "decks", name: "decks", category: "skateboard" },
  //     { id: "wheels", name: "wheels", category: "skateboard" },
  //     { id: "bearings", name: "bearings", category: "skateboard" },
  //     { id: "tracks", name: "tracks", category: "skateboard" },
  //     { id: "grips", name: "grips", category: "skateboard" },
  //   ],
  //   tshirts: [
  //     { id: "top", name: "top", category: "tshirt" },
  //     { id: "oversize", name: "oversize", category: "tshirt" },
  //     { id: "shorts", name: "shorts", category: "tshirt" },
  //   ],
  //   categoryName: ["skateboard", "tshirt"],
  // },

  categories: [
    {
      id: "skateboard",
      elements: ["decks", "wheels", "bearings", "tracks", "grips"],
    },
    {
      id: "tshirt",
      elements: ["top", "oversize", "shorts"],
    },
    // {
    //   tshirts: [
    //     { id: "top", name: "top", category: "tshirt" },
    //     { id: "oversize", name: "oversize", category: "tshirt" },
    //     { id: "shorts", name: "shorts", category: "tshirt" },
    //   ],
    // },
  ],

  categoryNames: ["skateboard", "tshirt"],

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
