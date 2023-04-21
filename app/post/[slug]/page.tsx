"use client"

import Post from "@/app/componets/Post"
import { useQuery } from "@tanstack/react-query"
import { type Post as PostType } from "@/app/types/Posts"
import axios from "axios"
import Loader from "@/app/componets/Loader"
import AddComment from "./AddComment"
import Comment from "./Comment"

type URL = {
  params: {
    slug: string
  }
}

async function fetchPostDetail(slug: string) {
  const res = await axios.get(`/api/posts/${slug}`)
  return res.data
}


export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: [url.params.slug],
    queryFn: () => fetchPostDetail(url.params.slug),
  })

  if (isLoading) return <Loader />

  const postProps = {
    userPick: data!.user.image,
    name: data!.user.name,
    postTitle: data!.title,
    id: data!.id,
    comments: data!.comments,
  }

  return (
    <>
      <Post key={data?.id} {...postProps} />
      {!!data?.comments.length ? data?.comments.map((comment) => {
        const isUserCanDelete = comment.user?.email ===data.sessionEmail
        return (
        <Comment
          key={comment.id}
          id={comment.id}
          idPost={data!.id}
          message={comment.message}
          userPick={comment.user!.image}
          name={comment.user!.name}
          isUserCanDelete={isUserCanDelete}
        />
      )}) : <div className="mt-8 text-xl ml-8 text-gra">комментариев еще нет</div>}
      <AddComment postId={postProps.id} />
    </>
  )
}
