import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import LoaderPage from "../../Components/LoaderPage/LoaderPage";
import PostCard from "../../Components/PostCard/PostCard";
import CommentCard from "../../Components/commentCard/commentCard";

export default function PostDetails() {
  const { id } = useParams();
  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
        headers: { token: localStorage.getItem("token") },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: getPostDetails,
  });
   function getPostComments(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`, {
      headers: { token: localStorage.getItem("token") },
    });
  }
  const {data : commentsData ,isLoading : commentsLoading ,isError : commentsError } = useQuery({
    queryKey:["postComments",id],
    queryFn:getPostComments,
  })
   if (commentsLoading) {
    return <LoaderPage />;
    }

    if (commentsError) {    
    return <h2>{commentsError.message}</h2>;
    }
    const comments = commentsData?.data?.data?.comments
 

  if (isLoading) {
    return <LoaderPage />;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

   
const postDetails = data.data.data.post;
  console.log("DATA",data)

  return <div className="min-h-screen  w-1/2 mx-auto">
    <PostCard postInfo={postDetails} isPostDetailsPage comments={comments}/>
  </div>;
}
