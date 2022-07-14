import {
  Card,
  CardContent,
  Grid,
  CardActions,
  Avatar,
  TextField,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
  },
  hide: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function Share() {
  const classes = styles();
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  useEffect(
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user._id}`)
        .then((res) => setImage(res.data.profilePicture)),
    []
  );

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
    console.log("start");
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("desc", desc);
    if (file) formData.append("file", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/`, formData)
      .then((res) => {
        console.log("postData", res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid xs={1} item>
            <Link to={`/profile/${user._id}`}>
              <Avatar className={classes.hide} src={image} />
            </Link>
          </Grid>
          <Grid xs={11} item>
            <TextField
              multiline
              placeholder="What's on your mind?"
              fullWidth
              InputProps={{ disableUnderline: true }}
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
            />
            {file && <img src={preview} style={{ width: "200px" }} />}
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
          Photo or Video
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </Button>

        <Button startIcon={<Label htmlColor="blue" />} className={classes.button}>
          <div className={classes.hide}>Tag</div>
        </Button>

        <Button startIcon={<Room htmlColor="green" />} className={classes.button}>
          <div className={classes.hide}>Location</div>
        </Button>

        <Button startIcon={<EmojiEmotions htmlColor="goldenrod" />} className={classes.button}>
          <div className={classes.hide}>Feelings</div>
        </Button>

        <Button
          variant="contained"
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
