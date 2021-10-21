import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  makeStyles,
  Typography,
  TextField,
  Avatar,
  Container,
} from "@material-ui/core";
import { firebaseDB } from "../config/config";
import { useContext } from "react";
import {AuthContext} from '../Context/AuthProvider';
import { Favorite, FavoriteBorder,ChatBubbleOutlineRounded, MoreVert } from "@material-ui/icons";

const VideoPosts = (props) => {
    // console.log(props);
let [user, setUser] = useState(null);
const [comment, setComment] = useState("");
const [commentList, setCommentList] = useState([]);
const [isLiked , setLike] = useState(false);
const [likesCount , setLikeCount] = useState(null);
const {currentUser} =useContext(AuthContext);
const useStyles = makeStyles({
  videoContainerSize: {
    height: "100%",
    width:"100%",
    borderBottom:"1px solid lightgrey",
    borderTop:"1px solid lightgrey"
  },
});
let classes = useStyles();
  useEffect( async() => {
    let uid = props.post.userId;
    let doc = await firebaseDB.collection("users").doc(uid).get();
    let user =doc.data(); 
    setUser(user);
    let commentList = props.post.comment;
    let updateCommentList =[];
    for(let i =0 ; i < commentList.length ; i++){
        let commentResponse = await firebaseDB.collection("users").doc(commentList[i].userId).get();
        let commentUser = commentResponse.data();
        updateCommentList.push( {
            commentPic:commentUser.profileImageUrl,
            comment:commentList[i].comment,
        });
    }

    // initialise like 
    let likesList = props.post.likes;
    likesList.forEach((like)=>{
      if(like == currentUser.uid){
        setLike(true);
      }
    })
    setLikeCount(likesList.length);
    ///

    setCommentList(updateCommentList);
    // console.log(commentList);
  }, []);

 const handleCommentPost= async(e)=>{
    let commentPic ;
    
    if (currentUser.uid === user.userId) {
      commentPic = user.profileImageUrl;
    } else {
      let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
      console.log(currentUser.uid);
      let user = doc.data();
      console.log(user);
      commentPic = user.profileImageUrl;
    }
    let newCommentList = [
        ...commentList,        {
            comment:comment,
            commentPic,
        }  
    ];
    
    let updatePost = props.post;
    updatePost.comment.push({userId:currentUser.uid,comment:comment});
    await firebaseDB.collection("posts").doc(updatePost.pid).set(updatePost);
    setCommentList(newCommentList);
    setComment("");

  }

  const toggleLikeIcon = async (e)=>{

    if(isLiked){
      let LikedPost = props.post;
      let likeList = LikedPost.likes.filter(likeid=>{
        if(likeid == currentUser.uid)
            return false;
        else
          return true;
      })
      LikedPost.likes = likeList;
      await firebaseDB.collection("posts").doc(props.post.pid).set(LikedPost);
      likesCount == 1 ? setLikeCount(null) : setLikeCount(likesCount-1);
      // console.log(likeList); 
     
      setLike(false);
    }else{
      let LikedPost = props.post;
      LikedPost.likes.push(currentUser.uid);
      await firebaseDB.collection("posts").doc(props.post.pid).set(LikedPost);
      setLike(true);
      setLikeCount(likesCount+1);
    }
      
  };
    return (
      <Container>
      <Card
        style={{
          // height: "80vh",
          backgroundColor:"white",
          width: "500px",
          margin: "auto",
          marginBottom: "40px",
          border :"1px solid lightgrey"
        }}
      >
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          }}>
          <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            // justifyContent:"space-around",
            padding:"20px",
            }}>
            <Avatar src={user ? user.profileImageUrl : ""} style={{objectFit:"contain",marginRight:"10px"}}></Avatar>
            <Typography variant="span" style={{fontWeight:"500"}}>{user ? user.username : ""}</Typography>
          </div>
          <MoreVert style={{marginTop:"25px"}}></MoreVert>
          
        </div>
        
        <div className="video-container">
          <Video
            className={classes.videoContainerSize}
            src={props.post.videoUrl}
          ></Video>
        </div>
        <div style={{display: "flex" ,alignItems:"center",padding :"10px 0 10px 5px"}}>
          {isLiked ? (
            <Favorite
            fontSize="large"
              onClick={() => toggleLikeIcon()}
              style={{ color: "red"}}
            ></Favorite>
          ) : (
            <FavoriteBorder fontSize="large" onClick={() => toggleLikeIcon()}></FavoriteBorder>
          )}
          <ChatBubbleOutlineRounded fontSize='large' style={{marginLeft:"16px"}} ></ChatBubbleOutlineRounded>
        </div>

        {likesCount > 0&& (
          <div>
            <Typography variant="p" style={{fontWeight:"600", padding:"16px"}}>{likesCount}  Likes </Typography>
          </div>
        )}
        {commentList.map((commentObj) => {
          return (
          <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            padding:"5px",
            }}>
          <Avatar src={commentObj.commentPic} style={{objectFit:"contain",marginRight:"10px"}}></Avatar>
          <Typography variant="span" style={{fontWeight:"500",fontSize:"1rem"}}>{commentObj.comment}</Typography>
        </div>
         
          );
        })}
        <div style={{display:"flex",marginTop:"10px"}}>
          <TextField style={{flex:"1"}}
            variant="outlined"
            label="Add a comment"
            size="small"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></TextField>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCommentPost}
          >
            Post
          </Button>
        </div>
       
      </Card>
    </Container>
      
    );
};

function Video(props) {
    return (
        
       
      <video
        style={{
            // height: "80%",
            width: "100%",
        }}
        muted={true}
        loop={true}
        controls
      >
        <source src={props.src} type="video/mp4"></source>
      </video>
    );
  }
 
export default VideoPosts;