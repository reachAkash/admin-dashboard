const express = require("express");
const fs = require("fs/promises");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("./models/data.model");
const PushDataRoute = require("./routes/pushData.route.js");
const GetDataRoute = require("./routes/getData.route.js");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected!"))
  .catch((err) => console.log(err));

// add production url if hosted
const allowedOrigins = ["http://localhost:5173", "https://production-url.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", PushDataRoute);
app.use("/api", GetDataRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server Started at ${process.env.PORT}`)
);
