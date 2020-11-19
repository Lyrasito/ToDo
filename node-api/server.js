const express = require("express");
const { router } = require("./router");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to db");
});

app.listen(3000, () => {
  console.log("App running at 3000");
});

module.exports = { app };
