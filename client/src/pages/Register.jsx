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
    registerWrapper: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    registerBox: {
        height:'75%',
        width:'80%',
        backgroundColor:'white',
        borderRadius:'10px',
        [theme.breakpoints.down('sm')]: {
            height:'100%'
        }
    },
    registerContent: {
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    registerInput: {
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
    regsiterButton: {
        height:'50px',
        borderRadius:'10px',
    },
    loginButton: {
        height:'50px',
        borderRadius:'10px',
        background:'#66bb6a',
        '&:hover': {
            background:'#388e3c'
        }
    }
}))

export default function Register() {
    const classes=styles();

    return (
        <>
        <CssBaseline/>
        <Grid container justifyContent='center' alignContent='center' className={classes.login}>
            <Grid container direction='row' spacing={1} className={classes.container}>
                <Grid item md={7} className={classes.registerWrapper}>
                        <Typography className={classes.logo}>Friendster</Typography>
                        <Typography className={classes.subtitle}>Connect with friends around you</Typography>
                </Grid>
                <Grid item md={5} className={classes.registerWrapper}>
                    <Card className={classes.registerBox}>
                        <CardContent className={classes.registerContent}>
                            <input placeholder="Username" className={classes.registerInput}/>
                            <input placeholder="Email" className={classes.registerInput} />
                            <input placeholder="Enter password" className={classes.registerInput} />
                            <input placeholder="Enter password again" className={classes.registerInput} />
                            <Button
                            variant="contained"
                            disableElevation="true"
                            className={classes.regsiterButton}
                            color="primary"
                            >
                            Sign Up
                            </Button>

                            <Button
                            variant="contained"
                            disableElevation="true"
                            className={classes.loginButton}
                            color="primary"
                            >
                            Log into Account
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}
