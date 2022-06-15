const userService = require("../services/user.js");

const signUp = (req, res) => {
  try {
    userService.signUp(req.body);
    return res.status(201).json({ message: "CREATED" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { signUp, getAll };
