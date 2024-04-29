const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    slide1: {
      type: Array,
    },
    slide2: {
      type: Array,
    },
    slide3: {
      type: Array,
    },
    slide4: {
      type: Array,
    },
    slide5: {
      type: Array,
    },
    slide6: {
      type: Array,
    },
    username: {
      type: String,
      required: true,
    },
    likedBy: {
      type: Array,
    },
    bookmarkedBy: {
      type: Array,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Story", storySchema);
