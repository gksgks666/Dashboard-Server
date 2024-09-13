const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  //header에 있는 access token 을 가져온다.
  const authHeader = req.headers.authorization;

  //token이 존재하는지 확인, 기존 token과 일치하는지 확인
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "access token이 존재하지 않습니다." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "access token이 일치하지 않습니다." });
    }
    req.user = user; // 검증된 사용자 정보를 요청 객체에 추가
    next();
  });
};

module.exports = verifyAccessToken;
