const express = require("express");
const path = require("path");
const helmet = require("helmet");

const cors = require("cors");
const morgan = require("morgan");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// api Router
const api = require("./routes/api");

require("dotenv").config();

const app = express();
app.use(helmet());

const corsOptions = {
  origin: [
    // `${process.env.ALLOWED_CORS_ORIGIN_LOCALHOST}`,
    `http://localhost:3000`,
  ],
  // origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api", api);
//測試用，之後移除
app.get("/", (req, res) => {
  res.status(200).send("Everything is very good!");
});

module.exports = app;
