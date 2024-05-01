const Story = require("../models/story");

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

    const storyDetails = new Story({
      category,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      username,
      likedBy: [],
      bookmarkedBy: [],
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

    res.json({ data: storyDetails });
  } catch (error) {
    next(error);
  }
};

const updateStoryDetailsById = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";
    const userId = req.username;

    if (!storyId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const isStoryExists = await Story.findOne({
      _id: storyId,
      username: userId,
    });

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

const updateLikesOnStoryPost = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";
    const userId = req.username;
    const likeStatus = req.query.likeStatus || "";

    if (!storyId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const storyDetails = await Story.findOne({
      _id: storyId,
    });

    if (!storyDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    let likes = storyDetails?.likedBy;

    if (likeStatus === "unliked") {
      likes.push(userId);
    } else if (likeStatus === "liked") {
      let result = likes.filter((item) => {
        return userId !== item;
      });
      likes = result;
    }

    await Story.updateOne(
      { _id: storyId },
      {
        $set: {
          category: storyDetails?.category,
          slide1: storyDetails?.slide1,
          slide2: storyDetails?.slide2,
          slide3: storyDetails?.slide3,
          slide4: storyDetails?.slide4,
          slide5: storyDetails?.slide5,
          slide6: storyDetails?.slide6,
          username: storyDetails?.username,
          bookmarkedBy: storyDetails?.bookmarkedBy,
          likedBy: likes,
        },
      }
    );

    res.json({ message: "Story updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getLikesOnStory = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";
    const userId = req.query.username || "";

    const storyDetails = await Story.findById(storyId);

    if (!storyDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    let likes = storyDetails?.likedBy;
    let likesCount = likes.length;
    let result = likes.filter((user) => {
      return user === userId;
    });
    let isLiked;

    if (result[0] === userId) {
      isLiked = true;
    } else {
      isLiked = false;
    }

    res.json({ likesCount, isLiked });
  } catch (error) {
    next(error);
  }
};

const updateBookmarkOnStory = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";
    const userId = req.username;
    const bookmarkStatus = req.query.bookmarkStatus || "";

    if (!storyId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const storyDetails = await Story.findOne({
      _id: storyId,
    });

    if (!storyDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    let bookmarks = storyDetails?.bookmarkedBy;

    if (bookmarkStatus === "not-bookmarked") {
      bookmarks.push(userId);
    } else if (bookmarkStatus === "bookmarked") {
      let result = bookmarks.filter((item) => {
        return userId !== item;
      });
      bookmarks = result;
    }

    await Story.updateOne(
      { _id: storyId },
      {
        $set: {
          category: storyDetails?.category,
          slide1: storyDetails?.slide1,
          slide2: storyDetails?.slide2,
          slide3: storyDetails?.slide3,
          slide4: storyDetails?.slide4,
          slide5: storyDetails?.slide5,
          slide6: storyDetails?.slide6,
          username: storyDetails?.username,
          likedBy: storyDetails?.likedBy,
          bookmarkedBy: bookmarks,
        },
      }
    );

    res.json({ message: "Story updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getBookmarkOnStory = async (req, res, next) => {
  try {
    const storyId = req.query.id || "";
    const userId = req.query.username || "";

    const storyDetails = await Story.findById(storyId);

    if (!storyDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    let bookmarks = storyDetails?.bookmarkedBy;

    let result = bookmarks.filter((user) => {
      return user === userId;
    });
    let isBookmarked;

    if (result[0] === userId) {
      isBookmarked = true;
    } else {
      isBookmarked = false;
    }

    res.json({ isBookmarked });
  } catch (error) {
    next(error);
  }
};

const getBookmarkedStories = async (req, res, next) => {
  try {
    const username = req.query.user || "";

    let storyDetails,
      storyResult = [];

    storyDetails = await Story.find({ bookmarkedBy: username });

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
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStoryPost,
  getStories,
  getStory,
  updateStoryDetailsById,
  updateLikesOnStoryPost,
  getLikesOnStory,
  updateBookmarkOnStory,
  getBookmarkOnStory,
  getBookmarkedStories,
};
