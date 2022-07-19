const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const dotenv = require("dotenv");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "." + extension);
  },
});
dotenv.config();

const upload = multer({ storage: storage });
const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_KEY);

//update info of the user
router.put(
  "/:id",
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
    {
      name: "coverPicture",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }

      let newBody = req.body;

      if (req.files.profilePicture) {
        const containerName = req.body.userId;
        const profileBlobName = req.files.profilePicture[0].filename;
        try {
          const filePath = "./" + req.files.profilePicture[0].path;
          const containerClient = blobServiceClient.getContainerClient(containerName);
          const blockBlobClient = containerClient.getBlockBlobClient(profileBlobName);
          const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
        } catch (err) {
          res.status(500).json(err);
          return;
        }
        newBody[
          "profilePicture"
        ] = `https://friendster.blob.core.windows.net/${containerName}/${profileBlobName}`;
      }

      if (req.files.coverPicture) {
        const containerName = req.body.userId;
        const coverBlobName = req.files.coverPicture[0].filename;
        try {
          const filePath = "./" + req.files.coverPicture[0].path;
          const containerClient = blobServiceClient.getContainerClient(containerName);
          const blockBlobClient = containerClient.getBlockBlobClient(coverBlobName);
          const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
        } catch (err) {
          res.status(500).json(err);
          return;
        }
        newBody[
          "coverPicture"
        ] = `https://friendster.blob.core.windows.net/${containerName}/${coverBlobName}`;
      }

      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: newBody,
        });
        res.status(200).json(user);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  }
);

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//search user
router.get("/search/:key", async (req, res) => {
  try {
    let users = await User.aggregate([
      {
        $search: {
          index: "AutoComplete",
          autocomplete: {
            query: `${req.params.key}`,
            path: "username",
            tokenOrder: "sequential",
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          username: 1,
          profilePicture: 1,
        },
      },
    ]);

    res.send(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
