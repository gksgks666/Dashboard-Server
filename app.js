const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 클라이언트 도메인
    credentials: true, // client에 쿠키를 전송하기 위해 설정
  })
);

// route
app.use(require("./routes"));

module.exports = app;
