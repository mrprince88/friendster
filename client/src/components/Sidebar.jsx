import {
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  Grid,
  Card,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const styles = makeStyles({
  sidebar: {
    top: "8vh",
    position: "fixed",
    width: "20%",
    marginLeft: "20px",
  },
  card: {
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
    paddingBottom: "20px",
  },
});

export default function Sidebar() {
  const classes = styles();

  return (
    <Grid container spacing={2} className={classes.sidebar}>
      <Grid item lg={12}>
        <Card className={classes.card}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <RssFeed />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Chat />
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <PlayCircleFilledOutlined />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Bookmark />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <HelpOutline />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <WorkOutline />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item lg={12}>
        <Card className={classes.card}>
          <CardHeader
            action={
              <>
                Ad
                <IconButton aria-label="settings">
                  <MoreHorizIcon />
                </IconButton>
              </>
            }
          />
          <img src="http://localhost:3000/assets/ad.jpg" height="320px" width="100%" alt="user" />
        </Card>
      </Grid>
    </Grid>
  );
}
