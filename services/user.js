const userRepository = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "G^!Sqg6CMWif";

const signUp = async (user) => {
  const check = await userRepository.findById(user.user_id);
  if (user.password.length < 8) {
    const error = new Error("비밀번호는 8글자 이상 입력해주세요.");
    error.statusCode = 400;
    throw error;
  } else {
    if (check) {
      const error = new Error("이미 존재하는 아이디입니다.");
      error.statusCode = 400;
      throw error;
    } else {
      const salt = await bcrypt.genSalt();
      const encoded = await bcrypt.hash(user.password, salt);
      const result = await userRepository.create({
        ...user,
        password: encoded,
      });
      // console.log("signUp return value", result);
      return result;
    }
  }
};

const getAll = async () => {
  const users = await userRepository.findAll();
  return users;
};

const login = async (user_id, password) => {
  const user = await userRepository.findById(user_id);
  if (user_id.length && password.length) {
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = jwt.sign(
          { user_id, nickname: user.nickname },
          SECRET_KEY,
          { expiresIn: "1d" }
        );
        console.log(token);
        return token;
      } else {
        const error = new Error("Invalid User");
        error.statusCode = 400;
        throw error;
      }
    } else {
      const error = new Error("Existing_User");
      error.statusCode = 409;
      throw error;
    }
  } else {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }
  // console.log(user);
};

module.exports = { signUp, getAll, login };
