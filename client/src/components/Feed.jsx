import {Container,Grid,makeStyles} from '@material-ui/core'
import Share from './Share'
import Post from './Post'
import {useState,useEffect} from 'react'
import axios from 'axios'

const styles = makeStyles(theme=>({
    container: {
        paddingTop:'6%',
        padding:'0 6%',
        [theme.breakpoints.down('sm')]: {
            padding:'0 2%',
            paddingTop:'20%'
        }
    },
    feed: {
        padding:'10px',
        [theme.breakpoints.down('sm')]: {
            padding:'0'
        }
    }
}))

export default function Feed() {
    const classes=styles();
    const [Posts,setPosts]=useState(null);
    const addr="http://localhost:3000/"

    useEffect(()=>{
        const fetchData=async()=>{
            await axios.get(`${addr}posts/timeline/614dc8f80c8f14b3484a737a`).then(res=>setPosts(res.data));
        }
        fetchData()
    },[]);


    return (
        <Container className={classes.container}>
            <Grid container className={classes.feed} spacing={3}>
                <Grid item xs={12}>
                    <Share />
                </Grid>
                {Posts?.map((post)=> (
                    <Grid item key={post._id} xs={12}>
                        <Post post={post} />
                    </Grid>)
                )}
            </Grid>
        </Container>
    )
}
