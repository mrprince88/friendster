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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "../apiCalls";

const useStyles = makeStyles((theme) => ({
  nav: {
    padding: "0 50px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
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
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
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
  const { dispatch } = useContext(AuthContext);

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
    <AppBar position="sticky">
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
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleClick}>
            <Avatar src={image} />
          </IconButton>
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
                      autoFocusItem={open}
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
