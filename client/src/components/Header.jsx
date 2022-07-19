import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  Popover,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "../apiCalls";
import SettingsIcon from "@material-ui/icons/Settings";
import { SocketContext } from "../context/SocketContext";
import { format } from "timeago.js";

const useStyles = makeStyles((theme) => ({
  nav: {
    padding: "0 50px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      flex: 1,
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
  },
  search: {
    position: "relative",
    borderRadius: "0.8rem 0.8rem 0.8rem 0.8rem",
    height: "60%",
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    color: "black",
    // width: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    backgroundColor: "red",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "2fr 3fr 2fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  option: {
    display: "flex",
    justifyContent: "space-between",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  icons: {
    color: "black",
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    height: "30%",
    marginLeft: "10px",
    border: "50%",
    marginTop: "5px",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const { socket } = useContext(SocketContext);
  const { dispatch } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      if (Array.isArray(data)) setNotifications(data);
      else setNotifications((prev) => [...prev, data]);
      setShowNotifications(true);
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  useEffect(
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user._id}`)
        .then((res) => setImage(res.data.profilePicture)),
    []
  );
  const loading = open && users.length === 0;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/search/${input}`)
      .then((res) => setUsers(res.data));
  }, [input]);

  return (
    <AppBar position="sticky" style={{ background: "#FFFFFF" }}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6" noWrap>
          Friendster
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            style={{ width: "100%" }}
            disableClearable
            options={users}
            getOptionLabel={(option) => option.username}
            onInputChange={(e) => setInput(e.target.value)}
            onChange={(e, user) => navigate(`/profile/${user._id}`)}
            renderOption={(props, option) => {
              return (
                <Box className={classes.option}>
                  <Avatar className={classes.hide} src={props.profilePicture} />
                  <Typography className={classes.label}>{props.username}</Typography>
                </Box>
              );
            }}
            renderInput={(params) => {
              const { InputLabelProps, InputProps, ...rest } = params;
              const newInputProps = {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              };
              return (
                <InputBase
                  {...newInputProps}
                  placeholder={"Find friends around the globe..."}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  {...rest}
                />
              );
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
          <IconButton className={classes.icons}>
            <Badge color="secondary" onClick={() => navigate("/messenger")}>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.icons}
            ref={notificationRef}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleClick}>
            <Avatar src={image} />
          </IconButton>

          <Popover
            open={showNotifications}
            onClose={() => setShowNotifications(false)}
            anchorEl={notificationRef.current}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Card style={{ width: "400px" }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <SettingsIcon />
                  </IconButton>
                }
                title={<Typography style={{ fontWeight: "500" }}>Notifications</Typography>}
              />
              <div style={{ maxHeight: "450px", overflowY: "scroll" }}>
                <CardContent>
                  {notifications.map((notification) => (
                    <>
                      <Typography variant="body1">
                        <span style={{ fontWeight: "500" }}>{notification.sender} &nbsp;</span>
                        {notification.message}
                      </Typography>
                      <Typography component="div" variant="body2">
                        <Box color="text.secondary">{format(notification.Date)}</Box>
                      </Typography>
                    </>
                  ))}
                </CardContent>
              </div>

              <div>
                <Button
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={() => setNotifications([])}
                >
                  Clear notifications
                </Button>
              </div>
            </Card>
          </Popover>

          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={Boolean(anchorEl)}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>Profile</MenuItem>
                      <MenuItem onClick={() => navigate(`/`)}>Home</MenuItem>
                      <MenuItem onClick={() => LogOut(dispatch)}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
}
