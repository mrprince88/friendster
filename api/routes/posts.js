const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");
const dotenv = require("dotenv");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, Date.now() + "." + extension);
  },
});

dotenv.config();

const upload = multer({ storage: storage });
const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_KEY);

//create a post
router.post("/", upload.single("file"), async (req, res) => {
  const containerName = req.body.user;

  if (req.file) {
    let blobName = req.file.filename;
    try {
      const filePath = "./" + req.file.path;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  const newPost = new Post({
    ...req.body,
    img: req.file ? `https://friendster.blob.core.windows.net/${containerName}/${blobName}` : "",
  });

  try {
    let savedPost = await newPost.save();
    savedPost = await savedPost.populate("user", {
      username: 1,
      _id: 1,
      profilePicture: 1,
    });
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ user: currentUser._id }).populate("user", {
      username: 1,
      _id: 1,
      profilePicture: 1,
    });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ user: friendId }).populate("user", {
          username: 1,
          _id: 1,
          profilePicture: 1,
        });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts
router.get("/profile/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate("user", {
      username: 1,
      _id: 1,
      profilePicture: 1,
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post comment
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("comment added");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comments
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments.user", {
      username: 1,
      _id: 1,
      profilePicture: 1,
    });
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
