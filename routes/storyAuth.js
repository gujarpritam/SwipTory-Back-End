const express = require("express");
const router = express.Router();
const storyController = require("../controller/storyAuth");

router.post("/add", storyController.createStoryPost);
router.get("/getAll", storyController.getStories);
router.get("/getOne", storyController.getStory);

module.exports = router;
