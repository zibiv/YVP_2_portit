"use client"
//In this component we get all data for the user

// Importing required packages and types
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { type authPosts } from "../types/AuthPosts"

import EditPost from "./EditPost"

// Function to fetch authenticated posts from server
async function fetchAuthPost() {
  const res = await axios.get("/api/posts/authPosts")
  return res.data
}

// Defining MyPosts component
export default function MyPosts() {
  // Using useQuery hook to fetch data from server
  const { data, error, isLoading } = useQuery<authPosts>({
    queryKey: ["authPosts"],
    queryFn: fetchAuthPost,
  })

  // If there's an error, display it
  if (error) return <h1>error.response.data.msg</h1>

  // If still loading, display a loading message
  if (isLoading) return <h1>Loading ...</h1>

  // Extracting posts and user data from fetched data
  const posts = data?.posts || []
  const name = data?.name || ""
  const image = data?.image || ""

  // Rendering the list of posts with their titles and user data
  return (
    <div>
      {posts.map((post) => (
        <EditPost
          key={post.id}
          comments={post.comments}
          id={post.id}
          name={name}
          title={post.title}
          userPick={image}
        />
      ))}
    </div>
  )
}
