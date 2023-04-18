"use client"

import axios from "axios"
import AddPost from "./componets/AddPost"
import { useQuery } from "@tanstack/react-query"
import Post from "./componets/Post"
import { type Post as DBPost } from "./types/Posts"
import Loader from "./componets/Loader"
//получение всех постов
async function fetchAllPost() {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<DBPost[]>({
    queryFn: fetchAllPost,
    queryKey: ['posts'],
  })

  if(error) return error
  if(isLoading) return <Loader />
  
  return (
      <main className="flex justify-start my-4 flex-col">
        <AddPost />
        {data?.map(post => {
          const props = {
            id: post.id,
            userPick: post.user.image,
            name: post.user.name,
            postTitle: post.title,
            comments: post.comments
          }
          return <Post key={post.id} { ...props }/>
        })}
        
      </main>
  )
}
