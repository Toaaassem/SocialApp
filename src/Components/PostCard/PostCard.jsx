import {
  Card,
//   CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import PostHeader from "../CardHeader/CardHeader";

export default function PostCard({postInfo}) {
    console.log(postInfo)
    const {body , image ,user ,createdAt ,comments ,topComment}= postInfo;
    const {photo ,name} =user
    // const {commentCreator}=topComment
    // const {name :creatorName,photo:creatorPhoto}=topComment?.commentCreator
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
      {topComment && <div className="">
        
        <PostHeader name={topComment.commentCreator.name} createdAt={topComment.createdAt} photo={topComment.commentCreator.photo}/>
        <div className="px-3 pb-2">{topComment?.content}</div>
      </div>}
    </Card>
  );
}
