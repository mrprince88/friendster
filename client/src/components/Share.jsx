import {
  Card,
  CardContent,
  Grid,
  CardActions,
  Avatar,
  InputBase,
  alpha,
  Divider,
  Button,
  makeStyles,
  Popover,
  Box,
  IconButton,
} from "@material-ui/core";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";

const styles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
  },
  card: {
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
  },
  search: {
    position: "relative",
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",

    backgroundColor: alpha(theme.palette.common.black, 0.05),
    color: "black",
    width: "95%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "15px",
    },
  },
  hide: {
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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
}));

export default function Share({ setPosts }) {
  const classes = styles();
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [openEmojis, setOpenEmojis] = useState(false);
  const emojiMenu = useRef();

  const onEmojiClick = (event, emojiObject) => {
    setDesc(desc + emojiObject.emoji);
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("desc", desc);
    if (file) formData.append("file", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/`, formData)
      .then((res) => {
        setDesc("");
        setPosts((prev) => [res.data, ...prev]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card elevation={1} className={classes.card}>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid xs={1} item>
            <Link to={`/profile/${user._id}`}>
              <Avatar src={user.profilePicture} />
            </Link>
          </Grid>
          <Grid xs={11} item>
            <div className={classes.search}>
              <InputBase
                placeholder="Type something"
                multiline
                maxRows={4}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            {file && (
              <Box
                display="flex"
                style={{ height: "100px", marginTop: "25px" }}
                alignItems="center"
              >
                <Box>
                  <img height="100px" width="150px" src={preview} />
                </Box>
                <Box style={{ alignSelf: "flex-start" }}>
                  <IconButton style={{ padding: "0" }} onClick={() => setFile(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardActions>
        <Button
          startIcon={<PermMedia htmlColor="tomato" />}
          component="label"
          className={classes.button}
        >
          <div className={classes.hide}>Photo</div>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </Button>

        <Button
          title="Not implemented yet"
          startIcon={<Label htmlColor="blue" />}
          className={classes.button}
        >
          <div className={classes.hide}>Tag</div>
        </Button>

        <Button
          title="Not implemented yet"
          startIcon={<Room htmlColor="green" />}
          className={classes.button}
        >
          <div className={classes.hide}>Location</div>
        </Button>

        <Button
          startIcon={<EmojiEmotions htmlColor="goldenrod" />}
          onClick={() => setOpenEmojis(!openEmojis)}
          className={(classes.button, classes.hide)}
          ref={emojiMenu}
        >
          <div className={classes.hide}>Feelings</div>
        </Button>

        <Popover
          open={openEmojis}
          onClose={() => setOpenEmojis(false)}
          anchorEl={emojiMenu.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </Popover>

        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          style={{ marginLeft: "auto" }}
          onClick={handleSubmit}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
