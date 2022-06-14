const express = require("express");

const router = express.Router();
router.get("/");
router.get("/:id");
router.put("/:id");
router.post("/");
router.delete("/:id");
export default router;
