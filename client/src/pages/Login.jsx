import {CssBaseline,Card,CardContent,Grid,makeStyles,Typography,Button} from '@material-ui/core'

const styles=makeStyles(theme => ({
    login: {
        background:'#f0f2f5',
        width:'100vw',
        height:'100vh',
    },
    container: {
        width:'70%',
        height:'70%',
        [theme.breakpoints.down('sm')]: {
            height:'100%'
        }
    },
    logo: {
        fontSize:'50px',
        fontWeight:'800',
        color: theme.palette.primary.main,
        marginBottom:'10px',
    },
    subtitle: {
        fontSize:'24px'
    },
    loginWrapper: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    loginBox: {
        height:'55%',
        width:'90%',
        backgroundColor:'white',
        borderRadius:'10px',
        [theme.breakpoints.down('sm')]: {
            height:'100%'
        }
    },
    loginContent: {
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    loginInput: {
        height:'50px',
        borderRadius:'10px',
        border:'1px solid grey',
        fontSize:'18px',
        paddingLeft:'20px',
        '&:focus' :{
            outline:'none'
        }
    },
    loginForgot:{
        textAlign:'center',
        color:theme.palette.primary.main
    },
    LoginButton: {
        height:'50px',
        borderRadius:'10px',
    },
    RegisterButton: {
        height:'50px',
        borderRadius:'10px',
        background:'#66bb6a',
        '&:hover': {
            background:'#388e3c'
        }
    }
}))

export default function Login() {
    const classes=styles();

    return (
        <>
        <CssBaseline/>
        <Grid container justifyContent='center' alignContent='center' className={classes.login}>
            <Grid container direction='row' spacing={1} className={classes.container}>
                <Grid item md={7} className={classes.loginWrapper}>
                        <Typography className={classes.logo}>Friendster</Typography>
                        <Typography className={classes.subtitle}>Connect with friends around you</Typography>
                </Grid>
                <Grid item md={5} className={classes.loginWrapper}>
                    <Card className={classes.loginBox}>
                        <CardContent className={classes.loginContent}>
                            <input placeholder="Email" className={classes.loginInput}/>
                            <input placeholder="Enter password" className={classes.loginInput} />
                            <Button
                            variant="contained"
                            disableElevation="true"
                            className={classes.LoginButton}
                            color="primary"
                            >
                            Log in
                            </Button>
                            <Typography className={classes.loginForgot}>Forgot Password</Typography>
                            <Button
                            variant="contained"
                            disableElevation="true"
                            className={classes.RegisterButton}
                            color="primary"
                            >
                            Create New Account
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}
