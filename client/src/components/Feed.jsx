import { Grid, makeStyles } from "@material-ui/core";
import Share from "./Share";
import Post from "./Post";

const styles = makeStyles((theme) => ({
  container: {
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2%",
      paddingTop: "8%",
    },
  },

  feed: {
    padding: "0 2% 0 2%",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
}));

export default function Feed({ posts }) {
  const classes = styles();

  return (
    <Grid className={classes.container}>
      <Grid container className={classes.feed} spacing={3}>
        <Grid item xs={12}>
          <Share />
        </Grid>
        {posts?.map((post) => (
          <Grid item key={post._id} xs={12}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
