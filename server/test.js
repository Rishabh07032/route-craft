require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("CONNECTED ✅");
  })
  .catch((err) => {
    console.log("ERROR ❌", err);
  });