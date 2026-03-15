import {
  Card,
//   CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  CardHeader
} from "@heroui/react";
import PostHeader from "../CardHeader/CardHeader";
import CommentCard from "../commentCard/commentCard";
import { Link } from "react-router-dom";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CommentCreation from "../CommentCreation/CommentCreation";

export default function PostCard({postInfo , isPostDetailsPage=false ,comments={} ,queryKey }) {
    console.log(postInfo)
    const {body , image ,user ,createdAt  ,topComment ,commentsCount ,id}= postInfo;
    const {photo ,name} =user
    {console.log("t",topComment)}
    // const {commentCreator}=topComment
    // const {name :creatorName,photo:creatorPhoto}=topComment?.commentCreator
    // to transfer data between pages we use the params in the url 
  
  return (
    <Card>  
      
      <PostHeader name={name} createdAt={createdAt} photo={photo}/>
      <Divider />
      <CardBody>
        <p>{body}</p>
        {image&&<div className="w-full h-100  "><img src={image} alt={body} className="w-full h-full cover"/></div>}   
      </CardBody>
      <Divider />

      <CardFooter className="flex justify-between">
        <div className="">
            like
        </div>
        <div className="">comment</div>
        <div className="">share</div>
      </CardFooter>
      <CommentCreation postId={id} queryKey={queryKey}/>
     {!isPostDetailsPage && <>{ commentsCount > 1 && (
        <Link to={`/postDetails/${id}`} className="text-center text-blue-500 cursor-pointer">View more comments</Link>
      )}</>} 
      {!isPostDetailsPage && topComment && <CommentCard topComment={topComment}/>}
      {isPostDetailsPage && comments?.map(comment=><CommentCard key={comment._id} topComment={comment}/>)}
    </Card>
  );
}
