const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 5,
    },
    role: {
      type: String,
      default: "2", // User: 2, Admin: 1, SuperAdmin: 0
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

// 비밀번호 저장 시 bcrypt를 사용하여 비밀번호를 암호화해서 넘겨준다
userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호가 암호화되어 있기때문에 bcrypt 라이브러리를 사용하여 비밀번호 일치 체크
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

// accessToken과 refreshToken을 생성
userSchema.methods.generateToken = async function () {
  try {
    let user = this;
    const accessToken = jwt.sign(
      { id: user._id, eamil: user.email },
      SECRET_KEY,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    user.token = refreshToken;
    const updateData = await user.save();
    return { updateData, accessToken };
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("AdminUser", userSchema);

module.exports = User;
