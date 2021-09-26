import Header from '../components/Header'
import Feed from '../components/Feed'
import { CssBaseline,Grid, Avatar, Typography, Box, makeStyles } from '@material-ui/core'
import Sidebar from '../components/Sidebar'
import ProfileRightBar from '../components/ProfileRightBar'

const styles = makeStyles((theme) => ({
    coverImg: {
        height: '380px',
        width: '100%',
        position: 'relative',
        objectFill: 'cover'
    },
    avatar: {
        height: '280px',
        width: '280px',
        border: '2px solid white',
    },
    profile: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position:'relative',
        bottom:'10vh',
        margin:0
    },
    sidebar:{
        display:'block',
        [theme.breakpoints.down('md')]: {
            display:'none'
        }
    },
}))

export default function ProfileHeader() {
    const classes = styles()
    const addr="http://localhost:3000/assets/"

    return (
        <>
            <CssBaseline/>
            <Header />
            <Grid container spacing={1}>
                <Grid item lg={2} className={classes.sidebar}>
                    <Sidebar />
                </Grid>

                <Grid container lg={10}>
                    <img src={addr+'/person/noCover.png'} alt={"cover"} className={classes.coverImg} />
                    <Box className={classes.profile}>
                        <Avatar src={addr+'/person/1.jpeg'} className={classes.avatar} />
                        <Typography variant='h3'>Jane Fox</Typography>
                        <Typography variant='subtitle1'>Hello guys!!</Typography>
                    </Box>

                    <Grid item lg={8} xs={12}>
                    <Feed />
                    </Grid>

                <Grid item lg={4} className={classes.sidebar}>
                    <ProfileRightBar/>
                </Grid>
                </Grid>#

            </Grid>
        </>
    )
}
