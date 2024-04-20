const Story = require("../models/story");
// const { decodeJwtToken } = require("../middlewares/verifyToken");
// const { ObjectId } = require("mongoose");

const createStoryPost = async (req, res) => {
  try {
    const {
      category,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      username,
    } = req.body;

    if (!category || !username) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    // const userId = req.userId;

    const storyDetails = new Story({
      category,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      username,
    });

    await storyDetails.save();

    res.json({ message: "Story created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStoryPost };
