"use client"

import axios from "axios"
import AddPost from "./componets/AddPost"
import { useQuery } from "@tanstack/react-query"
import Post from "./componets/Post"

//получение всех постов
async function fetchAllPost() {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchAllPost,
    queryKey: ['posts'],
  })

  if(error) return error
  if(isLoading) return <h1>Loading ...</h1>

  return (
      <main className="flex justify-start my-4 flex-col">
        <AddPost />
        {data.map(post => {
          const props = {
            id: post.id,
            userPick: post.user.image,
            name: post.user.name,
            postTitle: post.title,
          }
          return <Post key={post.id} { ...props }/>
        })}
        
      </main>
  )
}
