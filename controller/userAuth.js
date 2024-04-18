const SwipToryUser = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const isExistingUser = await SwipToryUser.findOne({ username: username });

    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists",
        isExistingUser: isExistingUser,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new SwipToryUser({
      username,
      password: hashedPassword,
    });

    await userData.save();

    const token = jwt.sign({ username: username }, process.env.SECRET_CODE, {
      expiresIn: "60h",
    });

    res.json({
      message: "User registered successfully",
      swiptoryToken: token,
      username: userData.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const userDetails = await SwipToryUser.findOne({ username });

    if (!userDetails) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { username: userDetails.username },
      process.env.SECRET_CODE,
      {
        expiresIn: "60h",
      }
    );

    res.json({
      message: "User logged in",
      swiptoryToken: token,
      username: userDetails.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { registerUser, loginUser };
