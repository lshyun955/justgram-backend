const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findById = async (id) => {
  const [user] = await prisma.$queryRaw`SELECT * FROM user where user_id=${id}`;
  return user;
};

const findAll = async () => {
  const users = await prisma.$queryRaw`SELECT * FROM USER`;
  return users;
};

const create = async (user) => {
  const { user_id, name, nickname, phone_number, email, password } = user;
  await prisma.$queryRaw`INSERT INTO user(user_id,password,name,nickname,email,phone_number) 
  VALUES (${user_id}, ${password}, ${name}, ${nickname}, ${email}, ${phone_number})`;
};

module.exports = { findById, findAll, create };
