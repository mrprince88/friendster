const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require("dotenv");

dotenv.config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_KEY);

router.post("/register", async (req, res) => {
  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user
    const user = await newUser.save();

    const containerName = user._id;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    const accessPolicyResult = await containerClient.setAccessPolicy("container");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    //Search DB using email address
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    //check if password is correct using bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
