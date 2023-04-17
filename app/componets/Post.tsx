"use client"

import Image from "next/image"
import Link from "next/link"
import { type Comment } from "../types/Posts"

interface PostProps {
  userPick: string
  name: string
  postTitle: string
  id: string,
  comments: Comment[]
}

export default function Post({ userPick, name, postTitle, id, comments } : PostProps) {
  return (
    <div className="bg-white my-2 p-8 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 ">
        <Image
          className="rounded-full"
          src={userPick}
          alt="user picture"
          width={32}
          height={32}
        />
        <h3 className="text-teal-700 font-bold">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">Comments: {comments.length}</p>
        </Link>
      </div>
    </div>
  )
}
