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

const getStories = async (req, res, next) => {
  try {
    const username = req.query.user || "";
    const category = req.query.category;

    console.log("username", username, "categ", category);

    let storyDetails,
      storyResult = [];

    if (category !== "All") {
      storyDetails = await Story.find({ category });
      storyDetails.map((item) => {
        let slide1 = item["slide1"];
        storyResult.push({
          id: item["_id"],
          heading: slide1[0],
          description: slide1[1],
          imgUrl: slide1[2],
          username: item["username"],
        });
      });

      return res.json({
        data: storyResult,
        category: category,
      });
    }

    let foodData, healthData, travelData, moviesData, educationData, userData;
    let foodResult = [],
      healthResult = [],
      travelResult = [],
      moviesResult = [],
      educationResult = [],
      userResult = [];

    foodData = await Story.find({ category: "Food" });

    foodData.map((item) => {
      let slide1 = item["slide1"];
      foodResult.push({
        id: item["_id"],
        heading: slide1[0],
        description: slide1[1],
        imgUrl: slide1[2],
        username: item["username"],
      });
    });

    healthData = await Story.find({ category: "Health and Fitness" });
    healthData.map((item) => {
      let slide1 = item["slide1"];
      healthResult.push({
        id: item["_id"],
        heading: slide1[0],
        description: slide1[1],
        imgUrl: slide1[2],
        username: item["username"],
      });
    });

    travelData = await Story.find({ category: "Travel" });
    travelData.map((item) => {
      let slide1 = item["slide1"];
      travelResult.push({
        id: item["_id"],
        heading: slide1[0],
        description: slide1[1],
        imgUrl: slide1[2],
        username: item["username"],
      });
    });

    moviesData = await Story.find({ category: "Movies" });
    moviesData.map((item) => {
      let slide1 = item["slide1"];
      moviesResult.push({
        id: item["_id"],
        heading: slide1[0],
        description: slide1[1],
        imgUrl: slide1[2],
        username: item["username"],
      });
    });

    educationData = await Story.find({ category: "Education" });

    educationData.map((item) => {
      let slide1 = item["slide1"];
      educationResult.push({
        id: item["_id"],
        heading: slide1[0],
        description: slide1[1],
        imgUrl: slide1[2],
        username: item["username"],
      });
    });

    console.log("edArr", educationResult);

    if (username) {
      userData = await Story.find({ username });

      userData.map((item) => {
        let slide1 = item["slide1"];
        userResult.push({
          id: item["_id"],
          heading: slide1[0],
          description: slide1[1],
          imgUrl: slide1[2],
          username: item["username"],
        });
      });
    }

    res.json({
      data: [
        foodResult,
        healthResult,
        travelResult,
        moviesResult,
        educationResult,
        userResult,
      ],
      // user: userData,
      // foodData: foodData,
      // healthData: healthData,
      // travelData: travelData,
      // moviesData: moviesData,
      // educationData: educationData,
    });
  } catch (error) {
    next(error);
  }
};

const getStory = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";

    const storyDetails = await Story.findById(storyId);

    if (!storyDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    console.log("storyDetails ", storyDetails);

    res.json({ data: storyDetails });
  } catch (error) {
    next(error);
  }
};

const updateStoryDetailsById = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";
    const userId = req.username;

    console.log("storyId", storyId);
    console.log("userId", userId);

    if (!storyId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const isStoryExists = await Story.findOne({
      _id: storyId,
      username: userId,
    });

    console.log("isStoryExist", isStoryExists);

    if (!isStoryExists) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

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

    await Story.updateOne(
      { _id: storyId, username: userId },
      {
        $set: {
          category,
          slide1,
          slide2,
          slide3,
          slide4,
          slide5,
          slide6,
          username,
        },
      }
    );

    res.json({ message: "Story updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStoryPost,
  getStories,
  getStory,
  updateStoryDetailsById,
};
