"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Toggle from "./Toggle"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { error } from "console"

type EditProps = {
  id: string
  userPick: string
  name: string
  title: string
  comments: {
    id: string
    userId: string
    postId: string
  }[]
}

export default function EditPost({
  userPick,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [toggle, setToggle] = useState(false)

  const mutation = useMutation(
    (id: string) => axios.delete("/api/posts/deletePost", { data: { id } }),
    {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        console.log(data)
        setToggle(false)
      },
    }
  )

  function handleClickDelete () {
    mutation.mutate(id)
  }

  return (
    <>
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
          <p className="break-all">{title}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              Comments: {comments.length}
            </p>
          </Link>
          <button className=" text-red-500 " onClick={() => setToggle(!toggle)}>
            Удалить
          </button>
        </div>
      </div>
      {toggle && <Toggle setToggle={setToggle} deletePost={handleClickDelete}/>}
    </>
  )
}
