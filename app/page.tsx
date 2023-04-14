"use client"

import axios from "axios"
import AddPost from "./componets/AddPost"
import { useQuery } from "@tanstack/react-query"


//получение всех постов
async function fetchAllPost() {
  const response = await axios.get('/api/posts/getPosts')
  return response.data

}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchAllPost,
    queryKey: ['posts']
  })

  return (
      <main className="flex justify-start my-4 flex-col">
        <h1 className="text-green-500">hellow!!!</h1>
        
        <AddPost />
      </main>
  )
}
