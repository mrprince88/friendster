import {
  CssBaseline,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";

const styles = makeStyles((theme) => ({
  login: {
    background: "#f0f2f5",
    minWidth: "500px",
    minHeight: "1000px",
  },
  container: {
    width: "70%",
    height: "70%",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  logo: {
    fontSize: "50px",
    fontWeight: "800",
    color: theme.palette.primary.main,
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "24px",
  },
  registerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  registerBox: {
    height: "100%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  registerContent: {
    height: "100%",
    padding: "15px",
  },
  registerInput: {
    height: "50px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid grey",
    fontSize: "18px",
    paddingLeft: "20px",
    marginBottom: "15px",
    "&:focus": {
      outline: "none",
    },
  },
  loginForgot: {
    width: "100%",
    textAlign: "center",
    marginBottom: "15px",

    color: theme.palette.primary.main,
  },
  regsiterButton: {
    width: "100%",
    height: "50px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  loginButton: {
    height: "50px",
    width: "100%",
    borderRadius: "10px",
    background: "#66bb6a",
    marginBottom: "15px",

    "&:hover": {
      background: "#388e3c",
    },
  },
}));

export default function Register() {
  const classes = styles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage(1);
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/register`, user)
        .then(({ data: user }) => {
          console.log(user);
          const newUser = new CometChat.User(user._id);
          newUser.setName(user.username);
          CometChat.createUser(newUser, process.env.REACT_APP_CHAT_AUTH_KEY).then(
            (user) => {
              console.log("user created", newUser);
              setErrorMessage(0);
            },
            (error) => {
              console.log("error", error);
              setErrorMessage(2);
            }
          );
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(2);
        });
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container justifyContent="center" alignContent="center" className={classes.login}>
        <Grid container direction="row" spacing={1} className={classes.container}>
          <Grid item md={7} className={classes.registerWrapper}>
            <Typography className={classes.logo}>Friendster</Typography>
            <Typography className={classes.subtitle}>Connect with friends around you</Typography>
          </Grid>
          <Grid item md={5} className={classes.registerWrapper}>
            <Card className={classes.registerBox} onSubmit={handleSubmit}>
              <form className={classes.registerContent}>
                <input
                  placeholder="Username"
                  className={classes.registerInput}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  placeholder="Email"
                  type="email"
                  className={classes.registerInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Enter password"
                  className={classes.registerInput}
                  type="password"
                  required
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  placeholder="Enter password again"
                  className={classes.registerInput}
                  required
                  type="password"
                  minLength="6"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />

                {errorMessage && (
                  <Typography variant="subtitle">
                    <Box color="error.main">
                      {errorMessage == 1
                        ? "Passwords do not match"
                        : "Some error occured. Please try again"}
                    </Box>
                  </Typography>
                )}

                <Button
                  variant="contained"
                  disableElevation="true"
                  className={classes.regsiterButton}
                  color="primary"
                  type="submit"
                >
                  Sign Up
                </Button>

                <Button
                  variant="contained"
                  disableElevation="true"
                  className={classes.loginButton}
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Log into Account
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
