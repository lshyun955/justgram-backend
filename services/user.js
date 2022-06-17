const userRepository = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../common/creatError.js");
const dotenv = require("dotenv");

dotenv.config();

const signUp = async (user) => {
  const check = await userRepository.findById(user.user_id);
  if (user.password.length < 8) {
    const error = createError("비밀번호는 8글자 이상 입력해주세요.", 400);
    throw error;
  } else {
    if (check) {
      const error = createError("이미 존재하는 아이디입니다.", 409);
      throw error;
    } else {
      const salt = await bcrypt.genSalt();
      const encoded = await bcrypt.hash(user.password, salt);
      const result = await userRepository.create({
        ...user,
        password: encoded,
      });
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
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        console.log(token);
        return token;
      } else {
        const error = createError("Invalid User", 400);
        throw error;
      }
    } else {
      const error = createError("Invalid User", 400);
      throw error;
    }
  } else {
    const error = createError("KEY_ERROR", 400);
    throw error;
  }
};

module.exports = { signUp, getAll, login };
