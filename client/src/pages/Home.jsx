import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import OnlineFriends from "../components/OnlineFriends";
import { SocketContext } from "../context/SocketContext";

const styles = makeStyles((theme) => ({
  sidebar: {
    paddingTop: "40px",
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  feed: {
    padding: "0 12% 0 12%",
    minHeight: "92vh",
    [theme.breakpoints.down("md")]: {
      padding: "0 2% 0 2%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  accordion: {
    position: "fixed",
    right: 10,
    width: "500px",
    bottom: "0",
  },
  accordionHeader: {
    border: "4px bold",
  },
}));

export default function Home() {
  const classes = styles();
  const [posts, setPosts] = useState();
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/timeline/${user._id}`).then((res) => {
      setPosts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      socket.emit("addUser", user._id);
    });
  }, []);

  return (
    <>
      {posts && (
        <>
          <CssBaseline />
          <Header />
          <Grid
            container
            justifyContent="center"
            style={{ background: "#f0f2f5", minWidth: "92vh" }}
          >
            <Grid item lg={2} className={classes.sidebar}>
              <Sidebar />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12} className={classes.feed}>
              <Feed posts={posts} setPosts={setPosts} userId={user._id} />
            </Grid>
            <Grid item lg={2} className={classes.sidebar}></Grid>
            <OnlineFriends />
          </Grid>
        </>
      )}
    </>
  );
}
