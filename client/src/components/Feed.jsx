import { Grid, makeStyles } from "@material-ui/core";
import Share from "./Share";
import Post from "./Post";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const styles = makeStyles((theme) => ({
  container: {
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2%",
      paddingTop: "8%",
    },
  },
}));

export default function Feed({ posts, setPosts, userId }) {
  const classes = styles();
  const { user } = useContext(AuthContext);

  return (
    <Grid className={classes.container}>
      <Grid container spacing={2}>
        {user._id == userId && (
          <Grid item xs={12}>
            <Share setPosts={setPosts} />
          </Grid>
        )}
        {posts?.map((post) => (
          <Grid item key={post._id} xs={12}>
            <Post post={post} posts={posts} setPosts={setPosts} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
