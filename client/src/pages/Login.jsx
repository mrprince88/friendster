import {
  CssBaseline,
  Container,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { LoginCall } from "../apiCalls";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = makeStyles((theme) => ({
  login: {
    background: "#f0f2f5",
    minWidth: "500px",
    minHeight: "100vh",
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
  loginWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  loginBox: {
    height: "100%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  loginContent: {
    height: "100%",
    padding: "15px",
  },
  loginInput: {
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
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  LoginButton: {
    height: "50px",
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  RegisterButton: {
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

export default function Login() {
  const classes = styles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginCall({ email: email, password: password }, dispatch, setIsError);
  };

  return (
    <>
      <CssBaseline />
      <Grid container justifyContent="center" alignContent="center" className={classes.login}>
        <Grid container direction="row" spacing={1} className={classes.container}>
          <Grid item md={7} className={classes.loginWrapper}>
            <Typography className={classes.logo}>Friendster</Typography>
            <Typography className={classes.subtitle}>Connect with friends around you</Typography>
          </Grid>
          <Grid item md={5} className={classes.loginWrapper}>
            <Card className={classes.loginBox}>
              <form className={classes.loginContent} onSubmit={handleSubmit}>
                <input
                  placeholder="Enter email"
                  type="email"
                  className={classes.loginInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Enter password"
                  type="password"
                  className={classes.loginInput}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isError && (
                  <Typography variant="subtitle">
                    <Box color="error.main">Invalid password or username. Please try again.</Box>
                  </Typography>
                )}
                <Button
                  variant="contained"
                  disableElevation="true"
                  className={classes.LoginButton}
                  color="primary"
                  type="submit"
                >
                  {isFetching ? <CircularProgress color="white" /> : "Log in"}
                </Button>
                <Typography className={classes.loginForgot}>Forgot Password</Typography>
                <Button
                  variant="contained"
                  disableElevation="true"
                  className={classes.RegisterButton}
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Create New Account
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
