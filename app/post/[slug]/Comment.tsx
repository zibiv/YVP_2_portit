"use client"

import Image from "next/image"

type CommentProps = {
  id: string
  message: string
  userPick: string
  name: string
}

export default function Comment({ message, id, userPick, name }: CommentProps) {
  return (
    <div className="bg-white/60 my-2 p-8 rounded-xl">
      <div className="flex gap-2 items-center">
        <Image
          src={userPick}
          alt="user pic"
          width={25}
          height={25}
          className="rounded-full"
        />
        <h3 className="font-bold">{name}</h3>
      </div>
        <p className="text-sm py-3 ml-8">{message}</p>
    </div>
  )
}
