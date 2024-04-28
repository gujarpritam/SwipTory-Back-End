const express = require("express");
const router = express.Router();
const storyController = require("../controller/storyAuth");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/add", storyController.createStoryPost);
router.get("/getAll", storyController.getStories);
router.get("/getOne", storyController.getStory);
router.put("/update", verifyToken, storyController.updateStoryDetailsById);
router.put(
  "/update/likes",
  verifyToken,
  storyController.updateLikesOnStoryPost
);
router.get("/getLikes", storyController.getLikesOnStory);

module.exports = router;
