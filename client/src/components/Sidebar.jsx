import { List,ListItem,ListItemIcon,makeStyles,ListItemText} from "@material-ui/core"
import {RssFeed,Chat,PlayCircleFilledOutlined,Group,Bookmark,HelpOutline,WorkOutline,Event,School} from "@material-ui/icons";


const styles=makeStyles({
  sidebar: {
    top: '8vh',
    position:'sticky'
  }
})

export default function Sidebar() {
  const classes=styles()
  return (
    <List className={classes.sidebar}>

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
        <School/>
      </ListItemIcon>
      <ListItemText primary="Courses" />
    </ListItem>

  </List>
  )
}
