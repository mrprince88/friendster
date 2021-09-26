import {Card,CardContent,Typography,makeStyles,Box} from '@material-ui/core'
import {Users} from '../dummyData'
const styles=makeStyles({
    card: {
        width:'90%'
    },
    image: {
        height: '100px',
        width:'100px',
        objectFill:'cover',
        borderRadius: '5px',
    },
    friends: {
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr'
    },
    friend: {
        display: 'flex',
        flexDirection:'column',
        margin: '5px'
    }
})
export default function ProfileRightBar() {
    const classes=styles()
    const addr="http://localhost:3000/assets/"

    return (
        <>
        <Card elevation={1} className={classes.card}>
            <CardContent>
            <Typography variant='h6'> About</Typography>
            <Typography variant='subtitle1'> City: New York</Typography>
            <Typography variant='subtitle1'> From: London</Typography>
            <Typography varaint='subtitle1'>Relationship: Single</Typography>

            <Box m={4} />
            
            <Typography variant='h6'>Friends</Typography>
            <Box className={classes.friends}>
            {Users.slice(0,6).map(user=>(
                <Box className={classes.friend}>
                    <img src={`${addr}/person/${user.id}.jpeg`} alt={"post"} className={classes.image} />
                    <Typography variant='subtitle2'>{user.username}</Typography>
                </Box> )) }
            </Box>
            </CardContent>
        </Card>
        </>
    )
}
