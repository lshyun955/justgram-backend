const userRepository = require("../models/user.js");

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
      const result = await userRepository.create(user);
      console.log("signUp return value", result);
      return result;
    }
  }
};

const getAll = async () => {
  const users = await userRepository.findAll();
  return users;
};

module.exports = { signUp, getAll };
