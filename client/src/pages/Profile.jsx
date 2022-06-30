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
} from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import EditIcon from "@material-ui/icons/Edit";
import EditProfile from "../components/EditProfile";

const styles = makeStyles((theme) => ({
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
  button: {
    borderRadius: "1em",
    fontWeight: 500,
  },
}));

export default function Profile() {
  const classes = styles();
  const { user: currentUser } = useContext(AuthContext);
  const userId = useParams().userId;
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [isFollowing, setisFollowing] = useState();
  const [isProfile, setIsProfile] = useState();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [home, setHome] = useState();
  const [relationship, setRelationship] = useState();

  useEffect(() => {
    axios.get(`/users/${userId}`).then((res) => {
      const u = res.data;
      setUser(u);
      setName(u.username);
      setGender(u.gender);
      setCity(u.city);
      setHome(u.from);
      setRelationship(u.relationship);
      setisFollowing(u.followers.includes(currentUser._id));
    });
    axios.get(`/posts/profile/${userId}`).then((res) => {
      setPosts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    });
    setIsProfile(userId === currentUser._id);
  }, [userId, isFollowing]);

  const followHandler = () => {
    axios
      .put(`/users/${userId}/${isFollowing ? "unfollow" : "follow"}`, {
        userId: currentUser._id,
      })
      .then((res) => {
        console.log(res);
        setisFollowing(!isFollowing);
      });
  };

  const dialogHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={1}>
        <Grid item lg={2} className={classes.sidebar}>
          <Sidebar />
        </Grid>
        <Grid container lg={8} style={{ position: "relative" }}>
          <img
            src={
              user?.coverPicture
                ? user.coverPicture
                : "http://localhost:3000/assets/person/noCover.png"
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
            <Avatar src={user?.profilePicture} className={classes.avatar} />
          </Grid>

          <Card style={{ width: "100%" }}>
            <CardContent>
              <Grid container>
                <Grid item lg={8} style={{ marginTop: "120px", paddingLeft: "15px" }}>
                  <div style={{ paddingBottom: "8px" }}>
                    <Typography variant="h4" style={{ marginBottom: "8px", fontWeight: "500" }}>
                      {user?.username} &nbsp;
                      {isProfile && (
                        <Button onClick={dialogHandler}>
                          <EditIcon />
                        </Button>
                      )}
                    </Typography>
                    <Typography variant="subtitle" style={{ fontSize: "1.1em" }}>
                      {user?.followers.length} followers &nbsp; &#183; &nbsp;
                      {user?.followings.length} following
                    </Typography>
                  </div>

                  <div>
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
                <Grid
                  item
                  lg={2}
                  className={classes.sidebar}
                  style={{
                    marginTop: "20px",
                    marginLeft: "auto",
                    // marginRight: "50px",
                  }}
                >
                  <Typography variant="h5"> About</Typography>
                  <Typography variant="subtitle1"> Gender: {user?.gender}</Typography>
                  <Typography variant="subtitle1"> City: {user?.city}</Typography>
                  <Typography variant="subtitle1"> Hometown: {user?.from}</Typography>
                  <Typography varaint="subtitle1">Relationship: {user?.relationship}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid item lg={12} style={{ padding: "0 10% 0 10%" }}>
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
    </>
  );
}
