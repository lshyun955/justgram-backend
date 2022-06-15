const express = require("express");
const postingController = require("../controllers/posting.js");

const router = express.Router();
router.get("/", postingController.findAll);
router.get("/:id", postingController.findById);
router.put("/:id", postingController.update);
router.post("/", postingController.create);
router.delete("/:id", postingController.remove);

module.exports = router;
