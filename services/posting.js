const postingRepositroy = require("../models/posting.js");

const findAll = async () => {
  const postingArr = await postingRepositroy.findAll();
  const result = postingArr.map((feed) => {
    return { ...feed, postingImages: feed.postingImages.filter(Boolean) };
  });
  return result;
};

const findById = async (id) => {
  const posting = await postingRepositroy.findById(id);
  console.log(posting);
  if (posting.length) {
    const result = {
      ...posting[0],
      comments: posting[0]["comments"].filter(Boolean),
    };
    return { data: result };
  } else {
    const error = new Error("Not Found");
    error.statusCode = 400;
    throw error;
  }
};

const update = async (id, content) => {
  const posting = await postingRepositroy.findById(id);
  if (posting.length) {
    return await postingRepositroy.update(id, content);
  } else {
    const error = new Error("Not Found");
    error.statusCode = 400;
    throw error;
  }
};

const create = async (userDto) => {
  const posting = await postingRepositroy.create(userDto);
  if (posting instanceof Error) {
    const error = new Error("Not Created");
    error.statusCode = 400;
    throw error;
  } else {
    return posting;
  }
};

const remove = async (id) => {
  const posting = await postingRepositroy.findById(id);
  if (posting.length) {
    return await postingRepositroy.remove(id);
  } else {
    const error = new Error("Not Found");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  update,
  create,
  remove,
};
