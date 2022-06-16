const userService = require("../services/user.js");

const signUp = async (req, res) => {
  try {
    await userService.signUp(req.body);
    return res.status(201).json({ message: "CREATED" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const token = await userService.login(user_id, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const verification = async () => {};
module.exports = { signUp, getAll, login, verification };
