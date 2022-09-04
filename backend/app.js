const express = require("express");
const mongoose = require("mongoose");
const router = require("../backend/routes/bookRoutes");
const { populate } = require("./model/Book");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use("/books", router);

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://Lathiesh:pass12345@bookstore.tcdgstt.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/frontend/build"));
} else {
}
