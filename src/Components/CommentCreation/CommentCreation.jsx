import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Input } from "@heroui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentCreation({postId ,queryKey}) {
    const [commentValue, setCommentValue] = useState("");
    const queryClientObj = useQueryClient();
  function handleAddComment() {
   const commentObj = {
      content: commentValue,
    //   image: {},
    };
    axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      commentObj,
      {
        headers: { token: localStorage.getItem("token") },
      },
    );
  }
  const { isPending,mutate:createCommentMutation } = useMutation({
    mutationFn: handleAddComment,
    onSuccess: () => {
        // request to update the keys 
        queryClientObj.invalidateQueries({queryKey:queryKey})
        setCommentValue("")
    },
    onError: () => {},
    onSettled: () => {},
  });
  return (
    <div className="p-2">
      <Input
        labelPlacement="outside"
        placeholder="Write a comment..."
        endContent={
          <div
            onClick={isPending ? undefined : createCommentMutation}
            className="bg-blue-400 p-2 rounded-full cursor-pointer text-white"
          >
            <FaArrowRightLong />
          </div>
        }
        type="text"
        value={commentValue}
        onChange={(e)=>setCommentValue(e.target.value)}
      />
    </div>
  );
}
