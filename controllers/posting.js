const postingService = require("../services/posting.js");

const findAll = async (req, res) => {
  try {
    const postings = await postingService.findAll();
    return res.status(200).json(postings);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const posting = await postingService.findById(req.params.id);
    return res.status(200).json(posting);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const result = await postingService.update(id, content);
    return res.status(200).json({ message: "UPDATED" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await postingService.create(req.body);
    return res.status(200).json({ message: "CREATED" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await postingService.remove(req.params.id);
    return res.status(204).json({ message: "DELETED" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { findAll, findById, update, create, remove };
