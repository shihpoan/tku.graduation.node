"use strict";
const express = require("express");
const xlsx = require("xlsx");

const path = require("path");
const helmet = require("helmet");

const cors = require("cors");
const morgan = require("morgan");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// api Router
const api = require("./routes/api");
const lineRouter = require("./routes/line");
require("dotenv").config();

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// line sdk 必須在 body parser 前
app.use("/line", lineRouter);

app.use(helmet());
const corsOptions = {
  origin: [
    // `${process.env.ALLOWED_CORS_ORIGIN_LOCALHOST}`,
    `http://localhost:3000`,
    `https://tku.gu.zhshihpoan.com`,
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

// GET API，每次返回 500 条记录
app.get("/data/:chunk", (req, res) => {
  const chunk = parseInt(req.params.chunk, 10);
  if (isNaN(chunk) || chunk < 1) {
    return res.status(400).send("Invalid chunk number");
  }

  const start = (chunk - 1) * chunkSize;
  const end = start + chunkSize;

  if (start >= data.length) {
    return res.status(404).send("Chunk not found");
  }

  const chunkData = data.slice(start, end);
  res.json(chunkData);
});

// 函數：讀取 Excel 文件並處理數據
function processExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = xlsx.utils.sheet_to_json(worksheet);

  const processedData = data.map((row) => {
    const classInfo = row["班級"];
    const id = row["學號"];
    const name = row["姓名"];
    return { class: classInfo, id: id, name: name };
  });

  return processedData;
}

// 函數：比對輸入文字和姓名
function matchName(input, name) {
  let matchCount = 0;
  for (const char of input) {
    if (name.includes(char)) {
      matchCount++;
    }
  }
  return matchCount >= 2;
}

// GET API
app.get("/check-name/:name", (req, res) => {
  const input = req.params.name;
  if (!input) {
    return res.status(400).send("請提供輸入文字");
  }

  // 處理 Excel 文件
  const filePath =
    "/Users/shihpoan/Desktop/專案/淡江畢業典禮2024/tku.graduation.node/students.xlsx"; // 替換成實際的文件路徑
  const data = processExcelFile(filePath);

  const result = data.some((item) => matchName(input, item.name));
  // cons;

  res.send(result ? "true" : "false");
});

module.exports = app;
