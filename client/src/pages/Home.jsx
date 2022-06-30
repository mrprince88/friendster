import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const styles = makeStyles((theme) => ({
  sidebar: {
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function Home() {
  const classes = styles();
  const [posts, setPosts] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/posts/timeline/${user._id}`).then((res) => {
      setPosts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container justifyContent="center">
        <Grid item lg={2} className={classes.sidebar}>
          <Sidebar />
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12} style={{ padding: "0 8% 0 8%" }}>
          <Feed posts={posts} />
        </Grid>
        <Grid item lg={2} className={classes.sidebar}>
          <Rightbar />
        </Grid>
      </Grid>
    </>
  );
}
