import Header from "../components/Header";
import Feed from "../components/Feed";
import {
  CssBaseline,
  Grid,
  Avatar,
  Typography,
  makeStyles,
  Button,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { useParams } from "react-router";
import axios from "axios";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import EditIcon from "@material-ui/icons/Edit";
import EditProfile from "../components/EditProfile";
import OnlineFriends from "../components/OnlineFriends";
import Loading from "../components/Loading";

const styles = makeStyles((theme) => ({
  banner: {
    position: "relative",
    [theme.breakpoints.up("lg")]: {
      marginLeft: "100px",
    },
  },
  coverImg: {
    height: "320px",
    width: "100%",
    position: "relative",
    objectFit: "cover",
  },
  avatar: {
    height: "250px",
    width: "250px",
    border: "2px solid white",
  },
  sidebar: {
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  feed: {
    padding: "0 25% 0 10%",
    minHeight: "40vh",
    [theme.breakpoints.down("md")]: {
      padding: "0 10% 0 10%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  button: {
    borderRadius: "1em",
    fontWeight: 500,
  },
  card: {
    width: "100%",
    borderRadius: "0 0 0.8rem 0.8rem",
  },
  about: {
    marginTop: "20px",
    marginLeft: "auto",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "15px",
    },
  },
}));

export default function Profile() {
  const classes = styles();
  const { user: currentUser } = useContext(AuthContext);
  const userId = useParams().userId;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isFollowing, setisFollowing] = useState();
  const [isProfile, setIsProfile] = useState();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [home, setHome] = useState();
  const [relationship, setRelationship] = useState();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`).then((res) => {
      const u = res.data;
      setUser(u);
      setName(u.username);
      setGender(u.gender);
      setCity(u.city);
      setHome(u.from);
      setRelationship(u.relationship);
      setisFollowing(u.followers.includes(currentUser._id));
    });
    axios.get(`${process.env.REACT_APP_API_URL}/posts/profile/${userId}`).then((res) => {
      setPosts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    });
    setIsProfile(userId === currentUser._id);
  }, [userId, isFollowing]);

  const followHandler = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/${userId}/${isFollowing ? "unfollow" : "follow"}`,
        {
          userId: currentUser._id,
        }
      )
      .then((res) => {
        console.log(res);
        if (!isFollowing) {
          socket.emit("sendNotification", {
            sender: currentUser.username,
            receiverId: user._id,
            message: "started following you",
          });
        }
        setisFollowing(!isFollowing);
      });
  };

  const dialogHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      {user && posts ? (
        <>
          <CssBaseline />
          <Header />
          <Grid container spacing={1} style={{ background: "#f0f2f5" }}>
            <Grid item lg={2} className={classes.sidebar}>
              <Sidebar />
            </Grid>
            <Grid container lg={8} className={classes.banner}>
              <img
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : `${process.env.REACT_APP_PUBLIC_URL}/assets/person/noCover.png`
                }
                alt={"cover"}
                className={classes.coverImg}
              />

              <Grid
                container
                style={{
                  position: "absolute",
                  top: "200px",
                  paddingLeft: "20px",
                  flexDirection: "column",
                }}
              >
                <Avatar src={user.profilePicture} className={classes.avatar} />
              </Grid>

              <Card className={classes.card}>
                <CardContent>
                  <Grid container>
                    <Grid item lg={8} style={{ marginTop: "120px", paddingLeft: "15px" }}>
                      <div style={{ paddingBottom: "8px", minWidth: "250px" }}>
                        <Typography variant="h4" style={{ marginBottom: "8px", fontWeight: "500" }}>
                          {user?.username}
                          <span>
                            {isProfile && (
                              <Button onClick={dialogHandler}>
                                <EditIcon />
                              </Button>
                            )}
                          </span>
                        </Typography>
                        <Typography variant="body1">
                          <Box color="text.secondary">
                            {user?.followers.length} followers &nbsp; &#183; &nbsp;
                            {user?.followings.length} following
                          </Box>
                        </Typography>
                      </div>

                      <div style={{ marginLeft: "22px" }}>
                        {!isProfile && (
                          <Button
                            variant={isFollowing ? "contained" : "outlined"}
                            color="primary"
                            className={classes.button}
                            onClick={followHandler}
                          >
                            {isFollowing ? <PeopleIcon /> : <PersonAddIcon />}
                            &nbsp;
                            {isFollowing ? "Following" : "Follow"}
                          </Button>
                        )}
                      </div>
                    </Grid>
                    <Grid item lg={2} className={classes.about}>
                      <Typography variant="h5"> About</Typography>
                      <Typography variant="subtitle1"> Gender: {user?.gender}</Typography>
                      <Typography variant="subtitle1"> City: {user?.city}</Typography>
                      <Typography variant="subtitle1"> Hometown: {user?.home}</Typography>
                      <Typography varaint="subtitle1">
                        Relationship: {user?.relationship}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Grid item lg={12} md={12} sm={12} xs={12} className={classes.feed}>
                <Feed posts={posts} userId={userId} />
              </Grid>
            </Grid>
            <EditProfile
              user={user}
              open={open}
              dialogHandler={dialogHandler}
              name={name}
              gender={gender}
              city={city}
              home={home}
              relationship={relationship}
              setName={setName}
              setGender={setGender}
              setCity={setCity}
              setHome={setHome}
              setRelationship={setRelationship}
            />
          </Grid>
          <OnlineFriends />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
