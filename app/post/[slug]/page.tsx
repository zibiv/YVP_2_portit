"use client"

import Post from "@/app/componets/Post"
import { useQuery } from "@tanstack/react-query"
import { type Post as PostType } from "@/app/types/Posts"
import axios from "axios"
import Loader from "@/app/componets/Loader"

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
  const { data, isLoading, error } = useQuery<PostType>({
    queryKey: ["postDetail", url.params.slug],
    queryFn: () => fetchPostDetail(url.params.slug),
  })

  if (isLoading) return <Loader />
  console.log(data)

  const props = {
    userPick: data!.user.image,
    name: data!.user.name,
    postTitle: data!.title,
    id: data!.id,
    comments: data!.comments,
  }

  return (
    <div>
      <Post key={data?.id} {...props} />
    </div>
  )
}
