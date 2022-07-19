import {
  List,
  withStyles,
  Badge,
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { Users } from "../dummyData";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function Rightbar() {
  return (
    <List
      style={{
        height: "100vh",
        width: "100%",
        overflowY: "scroll",
      }}
    >
      {Users.map((user, idx) => (
        <ListItem key={idx} button>
          <ListItemIcon>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt="user.username" src={`/assets/person/${user.id}.jpeg`} />
            </StyledBadge>
          </ListItemIcon>
          <ListItemText primary={user.username} />
        </ListItem>
      ))}
      {Users.map((user, idx) => (
        <ListItem key={idx + Users.length} button>
          <ListItemIcon>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt="user.username" src={`/assets/person/${user.id}.jpeg`} />
            </StyledBadge>
          </ListItemIcon>
          <ListItemText primary={user.username} />
        </ListItem>
      ))}
    </List>
  );
}
