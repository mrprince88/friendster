import {Card,CardContent,Grid,CardActions,Avatar,TextField,Divider,Button,makeStyles} from '@material-ui/core'
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"



const styles=makeStyles(theme=>({
    button: {
        textTransform:"none"
    },
    hide:{
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }
}))


export default function Share() {

    const classes=styles();

    return (
        <Card elevation={3}>
            <CardContent>

                <Grid container spacing={2} alignItems="flex-start">

                <Grid ixs={1} item>
                <Avatar className={classes.hide} src="/assets/person/1.jpeg"/>
                </Grid>
                <Grid xs={11} item>

                <TextField
                    multiline
                    placeholder="What's on your mind?"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    rows={4}
                />

                </Grid>
                </Grid>
            </CardContent>

            <Divider />

            <CardActions>
                <Button
                startIcon={<PermMedia htmlColor="tomato"/>}
                className={classes.button}
                >
                <div className={classes.hide}>Photo or Video</div>    
                </Button>

                <Button
                startIcon={<Label htmlColor="blue"/>}
                className={classes.button}
                >
                <div className={classes.hide}>Tag</div>  
                </Button>

                <Button
                startIcon={<Room htmlColor="green"/>}
                className={classes.button}
                >
                <div className={classes.hide}>Location</div>
                </Button>

                <Button
                startIcon={<EmojiEmotions htmlColor="goldenrod"/>}
                className={classes.button}
                >
                <div className={classes.hide}>Feelings</div>
                </Button>


                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                style={{marginLeft:'auto'}}
                >
                    Share
                </Button>
            </CardActions>

        </Card>
    )
}
