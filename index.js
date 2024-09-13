const dotenv = require("dotenv");
dotenv.config(); //.env 환경변수 로드
dotenv.config({
  // 개발/운영 각 환경변수 가져오기위한 세팅
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const PORT = process.env.PORT || 5000;

const app = require("./app");

// Database Connecting
require("./config/db")();

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
