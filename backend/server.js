const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./configs/connection");
const router = require("./routes/routes");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database Connection
connectDb(MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Db connection error", err);
    process.exit(1);
  });

//Routes
app.use("/api", router);

//Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
