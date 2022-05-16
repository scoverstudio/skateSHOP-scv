const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const productsRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoints
app.use("/api", orderRoutes);
app.use("/api", productsRoutes);

// API error page
app.use("/api", (req, res) => {
  res.status(404).send({ message: "Not found..." });
});

// React website
app.use(express.static(path.join(__dirname, "../build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// MONGOOSE
mongoose.connect(
  `mongodb+srv://SCOVER:${process.end.DB_PASS}@skateshop.qjh8m.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("=== Connected to the database ===");
});
db.on("error", (err) => console.log("Error: " + err));

// START SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
