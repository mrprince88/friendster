import {Avatar,Card,CardHeader,Button,makeStyles,CardMedia,CardActions,IconButton,Typography,CardContent,Divider} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment';
import {useState,useEffect} from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    desc: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    },
    actions: {
      justifyContent:'space-evenly'
    },
    button: {
      textTransform:'none',
      width:'50%'
    }
  }));

export default function Post({post}) {
    let classes=useStyles()
    const {userId,img,desc}=post
    const [user,setUser]=useState();
    const [likes,setLikes] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const addr='http://localhost:3000/'

    useEffect(()=>{
      const fetchData=async()=>await axios.get(`/users/${userId}`).then(res=>setUser(res.data));
      fetchData()
  },[userId]);
  
    const likeHandler =()=>{
      setLikes(isLiked ? likes-1 : likes+1)
      setIsLiked(!isLiked)
    }

    return (
        <Card elevation={4}>
        <CardHeader
          avatar={
            <Link to={`profile/${user?.username}`}>
              <Avatar 
                src={user?.profilePicture}
              />
            </Link>
          }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }

        title={user?.username}
        subheader={format(post.createdAt)}
      />

      <CardContent>
        <Typography paragraph>
          {desc}
        </Typography>
      <CardMedia
        className={classes.media}
        image={`${addr}assets/${img}`}
      />

      <div class={classes.desc}>
      <Typography variant='subtitle1'>
        {likes} people like this
      </Typography>

      <Typography  variant='subtitle1'>
         comments
      </Typography>

      </div>
      </CardContent>

      <Divider />

      <CardActions className={classes.actions}>
        <Button
        className={classes.button}
        startIcon={<ThumbUpIcon htmlColor={isLiked ? 'blue':'none'}/>}
        onClick={likeHandler}
        color={isLiked ? 'primary':'none'}
        >
          Like
        </Button>

        <Button
        className={classes.button}
        startIcon={<CommentIcon/>}
        >
          Comment
        </Button>

      </CardActions>
      </Card>
    )
}
