import { CardHeader  ,Image} from '@heroui/react'
import React from 'react'

export default function PostHeader({name , createdAt , photo}) {
  return (
    <div>
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <Image
            alt="heroui logo"
            height={40}
            radius="full"
            //user photo
            src={photo}
            width={40}
            onError={(e)=>{e.target.src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}}
          />
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{createdAt}</p>
          </div>
        </div>
        <p>x</p>
      </CardHeader>
    </div>
  )
}
