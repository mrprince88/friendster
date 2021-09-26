import { alpha, makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Typography,InputBase,Badge,Avatar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  nav: {
    padding: '0 50px',
  },
  title: {
    display: 'flex',
    fontWeight:'700',
    paddingRight:'20px',
    [theme.breakpoints.down('sm')]: {
      flex:1
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
      <AppBar position="fixed">

        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>
            Friendster
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

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
            <IconButton
              edge="end"
              color="inherit"
            >
              <Avatar src="/assets/person/1.jpeg" />
            </IconButton>

        </Toolbar>
      </AppBar>
  );
}
