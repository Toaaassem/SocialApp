import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import { BeatLoader } from "react-spinners";
import LoaderPage from "../../Components/LoaderPage/LoaderPage";

export default function Home() {
const [allPosts, setAllPosts] = useState(null); 
const [isLoading, setisLoading] = useState(false);
const [isError, setIsError] = useState(false);
 function getAllPosts() {
  setisLoading(true)
    axios.get("https://route-posts.routemisr.com/posts?sort=-createdAt", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((resp) => {
        setAllPosts(resp.data.data.posts)
      })
      .catch((error) => {
        console.log(error);
        setIsError(error)
      }).finally(()=>{
        setisLoading(false)
      });
  }
  useEffect(() => {
    getAllPosts();
  }, []);

  if(isLoading){
    return <LoaderPage/>
  }

  if(isError){
    return <h2>Error.</h2>
  }
  return (
    <div className="min-h-screen">
      <div className="px-3  md:w-1/2   min-h-screen mx-auto flex flex-col gap-5">
      {allPosts?.map(post=><PostCard key={post._id} postInfo={post}/>)}

      </div>
    </div>
  );
}
