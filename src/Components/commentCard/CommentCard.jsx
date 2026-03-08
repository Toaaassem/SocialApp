import React from 'react'
import PostHeader from '../CardHeader/CardHeader'

export default function CommentCard({topComment}) {
  return (
    <div>
     <div className="">
        
        <PostHeader name={topComment.commentCreator.name} createdAt={topComment.createdAt} photo={topComment.commentCreator.photo}/>
        <div className="px-3 pb-2">{topComment?.content}</div>
      </div>
    </div>
  )
}
