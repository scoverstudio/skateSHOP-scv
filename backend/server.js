const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoints
// app.use("/api", productsRoutes);

// API error page
app.use("/api", (req, res) => {
  res.status(404).send({ product: "Not found..." });
});

// React website
app.use(express.static(path.join(__dirname, "../build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// MONGOOSE
mongoose.connect("mongodb://localhost:27017/skateShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
