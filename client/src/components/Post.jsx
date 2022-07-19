import {
  Avatar,
  Card,
  CardHeader,
  Button,
  makeStyles,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  CardContent,
  Divider,
  Box,
  Popper,
  Grow,
  Paper,
  MenuItem,
  ClickAwayListener,
  MenuList,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import { useState, useEffect, useContext, useRef } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostDialog from "./PostDialog";
import { SocketContext } from "../context/SocketContext";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  desc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    justifyContent: "space-evenly",
  },
  button: {
    textTransform: "none",
    width: "50%",
  },
  card: {
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
  },
}));

export default function Post({ post, setPosts }) {
  let classes = useStyles();
  const { user, img, desc } = post;
  const { user: currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const menu = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState();
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments.length);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, []);

  const likeHandler = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/posts/${post._id}/like`, {
        userId: currentUser._id,
      })
      .then((res) => {
        setLikes(isLiked ? likes - 1 : likes + 1);

        if (!isLiked) {
          socket.emit("sendNotification", {
            sender: currentUser.username,
            receiverId: post.user._id,
            message: "liked your post",
          });
        }

        setIsLiked(!isLiked);
      });
  };

  const handleClose = () => {
    setOpenPostDialog(false);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const deletePost = () => {
    console.log(post._id, currentUser._id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        data: {
          userId: currentUser._id,
        },
      })
      .then((res) => {
        setPosts((prev) => prev.filter((p) => p._id !== post._id));
        setOpenMenu(false);
      });
  };

  return (
    <Card elevation={1} className={classes.card}>
      <CardHeader
        avatar={
          <Link to={`/profile/${user._id}`}>
            <Avatar src={user.profilePicture} />
          </Link>
        }
        action={
          <IconButton onClick={() => setOpenMenu(!openMenu)} ref={menu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link to={`/profile/${user?._id}`} style={{ color: "inherit", textDecoration: "none" }}>
            <Typography style={{ fontWeight: "500" }}>{user.username}</Typography>
          </Link>
        }
        subheader={format(post.createdAt)}
      />

      <CardContent>
        <Typography variant="subtitle1">{desc}</Typography>
        <br />
        {img && (
          <>
            <CardMedia className={classes.media} image={img} />
            <br />
          </>
        )}
        <div className={classes.desc}>
          <Typography component="div" variant="body1">
            <Box color="text.secondary">{likes} likes</Box>
          </Typography>

          <Typography component="div" variant="body1">
            <Box color="text.secondary">{commentCount} comments</Box>
          </Typography>
        </div>
      </CardContent>

      <Divider />

      <CardActions className={classes.actions}>
        <Button
          className={classes.button}
          startIcon={<ThumbUpIcon htmlColor={isLiked ? "blue" : "none"} />}
          onClick={likeHandler}
          color={isLiked ? "primary" : "default"}
        >
          Like
        </Button>

        <Button
          className={classes.button}
          startIcon={<CommentIcon />}
          onClick={() => setOpenPostDialog(true)}
        >
          Comment
        </Button>
      </CardActions>

      {openMenu && (
        <Popper open={openMenu} anchorEl={menu.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleMenuClose}>
                  <MenuList>
                    {post.user._id === currentUser._id && (
                      <MenuItem onClick={deletePost}>Delete</MenuItem>
                    )}
                    <MenuItem onClick={handleMenuClose}>Cancel</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
      {openPostDialog && (
        <PostDialog
          open={openPostDialog}
          onClose={handleClose}
          image={img}
          user={user}
          post={post}
          desc={desc}
          likes={likes}
          setIsLiked={setIsLiked}
          setCommentCount={setCommentCount}
          commentCount={commentCount}
          likeHandler={likeHandler}
        />
      )}
    </Card>
  );
}
