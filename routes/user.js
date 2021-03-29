const express = require("express");
const router = express.Router();
const { list, add } = require("../controllers/user");

router.get("/list", list);
router.post("/add", add);

module.exports = router;
