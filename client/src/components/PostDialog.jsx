import {
  Card,
  CardHeader,
  Dialog,
  Grid,
  makeStyles,
  Avatar,
  IconButton,
  Typography,
  CardContent,
  Divider,
  InputBase,
  alpha,
  Button,
  Box,
  Popover,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { EmojiEmotions } from "@material-ui/icons";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import Picker from "emoji-picker-react";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "80vh",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      overflow: "scroll",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    background: "black",
  },
  card: {
    height: "100%",
  },
  comments: {
    height: "60vh",
    width: "100%",
    overflowY: "scroll",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  search: {
    position: "relative",
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
    marginTop: "10px",
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    color: "black",
    width: "90%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  footer: {
    height: "10vh",
    bottom: "0",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  button: {
    textTransform: "none",
    marginTop: "10px",
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
  },
  like: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  entryBar: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
}));

export default function PostDialog({
  open,
  image,
  user,
  post,
  desc,
  onClose,
  likes,
  isLiked,
  likeHandler,
  setCommentCount,
  commentCount,
}) {
  const classes = useStyles();
  const { user: currentUser } = useContext(AuthContext);
  const [openEmojis, setOpenEmojis] = useState(false);
  const [comments, setComments] = useState(null);
  const [text, setText] = useState("");
  const emojiMenu = useRef();
  const [isNewComment, setIsNewComment] = useState(false);
  const { socket } = useContext(SocketContext);

  const onEmojiClick = (event, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/${post._id}/comment`, {
        text: text,
        user: currentUser._id,
      })
      .then((res) => {
        console.log("posted");
        setIsNewComment(true);
        setCommentCount(commentCount + 1);
        setText("");
        socket.emit("sendNotification", {
          sender: currentUser.username,
          receiverId: post.user._id,
          message: "commented on your post",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${post._id}/comments`).then((res) => {
      setComments(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      res.data.map((val) => console.log(val));
    });
    setIsNewComment(false);
  }, [isNewComment]);

  return (
    <>
      {comments && (
        <Dialog open={open} fullWidth="true" maxWidth={image ? "lg" : "md"} onClose={onClose}>
          <Grid container className={classes.dialog}>
            {image && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <img src={image} className={classes.image} />
              </Grid>
            )}
            <Grid item lg={image ? 6 : 12} md={image ? 6 : 12} sm={image ? 6 : 12} xs={12}>
              <Card ref={emojiMenu}>
                <CardHeader
                  avatar={
                    <Link to={`/profile/${user._id}`}>
                      <Avatar src={user.profilePicture} />
                    </Link>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    <Link
                      to={`/profile/${user._id}`}
                      commentCount={commentCount}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Typography style={{ fontWeight: "500" }}>{user.username}</Typography>
                    </Link>
                  }
                />
                <Divider />
                <div className={classes.comments}>
                  <CardContent style={{ position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "row", paddingBottom: "5px" }}>
                      <Link to={`/profile/${user?._id}`}>
                        <Avatar src={user?.profilePicture} />
                      </Link>
                      <Typography variant="body1" style={{ marginLeft: "10px", paddingTop: "5px" }}>
                        <span>
                          <Link
                            to={`/profile/${user?._id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            <Typography style={{ fontWeight: "500" }}>{user?.username}</Typography>
                          </Link>
                        </span>
                        <Typography variant="body1">{desc}</Typography>
                        <Typography component="div" variant="body2">
                          <Box color="text.secondary">{format(post.createdAt)}</Box>
                        </Typography>
                      </Typography>
                    </div>
                  </CardContent>
                  <Divider />

                  {comments?.map((comment) => (
                    <CardContent style={{ position: "relative" }}>
                      <div style={{ display: "flex", flexDirection: "row", paddingBottom: "5px" }}>
                        <Link to={`/profile/${comment.user._id}`}>
                          <Avatar src={comment.user.profilePicture} />
                        </Link>
                        <Typography
                          variant="body1"
                          style={{ marginLeft: "10px", paddingTop: "5px" }}
                        >
                          <span>
                            <Link
                              to={`/profile/${comment.user._id}`}
                              style={{ color: "inherit", textDecoration: "none" }}
                            >
                              <Typography style={{ fontWeight: "500" }}>
                                {comment.user.username}
                              </Typography>
                            </Link>
                          </span>
                          <Typography variant="body1">{comment.text}</Typography>
                          <Typography component="div" variant="body2">
                            <Box color="text.secondary">{format(comment.createdAt)}</Box>
                          </Typography>
                        </Typography>
                      </div>
                    </CardContent>
                  ))}
                </div>

                <Divider />

                <CardContent classsName={classes.footer}>
                  <div style={{ marginLeft: "15px" }}>
                    <Typography component="div" variant="body2">
                      <Box color="text.secondary">{likes} people like this</Box>
                    </Typography>
                  </div>
                  <div className={classes.entryBar}>
                    <IconButton
                      className={(classes.button, classes.like)}
                      onClick={() => setOpenEmojis(!openEmojis)}
                    >
                      <EmojiEmotions htmlColor="goldenrod" />
                    </IconButton>
                    <div className={classes.search}>
                      <InputBase
                        placeholder="Type something"
                        multiline
                        maxRows={1}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>

                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={handleSubmit}
                      style={{ marginLeft: "10px" }}
                    >
                      Post
                    </Button>
                    <IconButton
                      className={classes.button}
                      startIcon={<ThumbUpIcon htmlColor={isLiked ? "blue" : "none"} />}
                      onClick={likeHandler}
                      color={isLiked ? "primary" : "none"}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Dialog>
      )}

      <Popover
        open={openEmojis}
        onClose={() => setOpenEmojis(false)}
        anchorEl={emojiMenu.current}
        anchorOrigin={{
          vertical: 420,
          horizontal: "left",
        }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
    </>
  );
}
