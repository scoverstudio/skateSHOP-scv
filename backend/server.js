/* eslint-disable quotes */
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { auth } = require("express-openid-connect");

const productsRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "https://localhost:8000",
  clientID: "wre9BbnNIt30KnUqRJSdqzndjREqVcVg",
  issuerBaseURL: "https://dev-jdg-80iv.us.auth0.com",
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth(config));

// API endpoints
app.use("/api", orderRoutes);
app.use("/api", productsRoutes);
app.use("/api", userRoutes);

const { requiresAuth } = require("express-openid-connect");

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/", function (req, res) {
  res.json({ message: "OK" });
});

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
  `mongodb+srv://SCOVER:studenttest123@skateshop.qjh8m.mongodb.net/?retryWrites=true&w=majority`,
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
