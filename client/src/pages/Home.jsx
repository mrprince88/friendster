import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import {CssBaseline, Grid,makeStyles} from '@material-ui/core'

const styles=makeStyles(theme=>({
    sidebar:{
        display:'block',
        [theme.breakpoints.down('md')]: {
            display:'none'
        }
    }
}))

export default function Home() {
    const classes=styles();

    return (
        <>
        <CssBaseline/>
        <Header/>
        <Grid container justifyContent='center'>
            <Grid item lg={2} className={classes.sidebar}>
                <Sidebar />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Feed />
            </Grid>
            <Grid item lg={2} className={classes.sidebar}>
                <Rightbar />
            </Grid>
        </Grid>
        </>
    )
}
