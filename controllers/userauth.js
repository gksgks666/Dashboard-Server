const User = require("../models/User");
const userAuthControllers = {};

userAuthControllers.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

userAuthControllers.login = async (req, res) => {
  try {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({
        message: "해당 이메일과 일치하는 사용자가 없습니다.",
      });
    //요청된 이메일이 데이터베이스에 있다면 맞는 비밀번호인지 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    //비밀번호까지 맞다면 토큰을 생성하기
    const updatedUser = await user.generateToken();
    //토큰 저장하기
    res
      .cookie("refreshToken", updatedUser.updateData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        SameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      })
      .status(200)
      .json({
        message: "success",
        userId: updatedUser.updateData._id,
        role: updatedUser.updateData.role,
        accessToken: updatedUser.accessToken,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

userAuthControllers.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({ token: refreshToken });
    if (user) {
      user.token = null;
      await user.save();
    }

    res
      .cookie("refreshToken", "", { expires: new Date(0) })
      .status(200)
      .json({ message: "success" });
  } catch (error) {
    res
      .cookie("refreshToken", "", { expires: new Date(0) })
      .status(404)
      .json({ message: error.message });
  }
};

/*
 * refreshToken및 accessToken 재발급
 * accessToken이 유효하지 않은경우 -> refreshToken을 확인한 후 모든 토큰 재발급
 * refreshToken이 유효하지 않은경우 -> 클라이언트 재로그인
 * 보안상 token은 무조건 1회성으로 사용하고 재발급
 */
userAuthControllers.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.body.userId;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    const user = await User.findOne({ _id: userId, token: refreshToken });
    if (!user) {
      return res
        .cookie("refreshToken", "", { expires: new Date(0) })
        .status(401)
        .json({ message: "userId or Refresh token is missing" });
    }

    const updatedUser = await user.generateToken();
    res
      .cookie("refreshToken", updatedUser.updateData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        SameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      })
      .status(200)
      .json({ message: "success", accessToken: updatedUser.accessToken });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 보호된 엔드포인트
userAuthControllers.protected = (req, res) => {
  // middleware/auth.js 에서 accessToken 체크
  res.status(200).json({ message: "success" });
};

module.exports = userAuthControllers;
