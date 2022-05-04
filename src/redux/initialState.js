const initialState = {
  categories: [
    { id: "deck", name: "deck" },
    { id: "wheel", name: "wheel" },
    { id: "bearing", name: "bearing" },
    { id: "track", name: "track" },
    { id: "grip", name: "grip" },
  ],
  products: [
    {
      id: "Deck-Baker-Rowan-Brand-Name",
      name: "Deck Baker Rowan Brand Name",
      producer: "Baker Skateboards",
      category: "deck",
      size: "8.0''",
      color: "black",
      gender: "unisex",
      price: 120,
    },
    {
      id: "Deck-Element-Section",
      name: "Deck Element Section",
      producer: "Element Skateboards",
      category: "deck",
      size: "7.5''",
      color: "black",
      gender: "unisex",
      price: 60,
    },
    {
      id: "Deck-Baker-Rowan-Brand-Name",
      name: "Deck Baker Rowan Brand Name",
      producer: "Baker Skateboards",
      category: "deck",
      size: "8.0''",
      color: "black",
      gender: "unisex",
      price: 20,
    },
    {
      id: "Deck-Element-Section",
      name: "Deck Element Section",
      producer: "Element Skateboards",
      category: "deck",
      size: "8.5''",
      color: "black",
      gender: "unisex",
      price: 120,
    },
    {
      id: "Deck-Element-Section",
      name: "Deck Element Section",
      producer: "Element Skateboards",
      category: "deck",
      size: "8.0''",
      color: "black",
      gender: "unisex",
      price: 55,
    },
  ],
  cart: {
    products: [],
    subtotal: 0,
    freeDelivery: 150,
    deliveryCost: 20,
  },
  orders: {},
};

export default initialState;
