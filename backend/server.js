require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

///MIDDLEWARE to handle CORS

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authoriztion"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
