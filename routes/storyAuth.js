const express = require("express");
const router = express.Router();
const storyController = require("../controller/storyAuth");

router.post("/add", storyController.createStoryPost);
router.get("/get", storyController.getStories);

module.exports = router;
