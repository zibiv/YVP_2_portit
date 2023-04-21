"use client"

// Importing necessary modules from external libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Image from "next/image"
import { toast } from "react-hot-toast"

// Defining the type of props being passed to the component
type CommentProps = {
  id: string
  message: string
  userPick: string
  name: string
  isUserCanDelete: boolean
  idPost: string
}

// Exporting the Comment component as default
export default function Comment({
  message,
  id,
  userPick,
  name,
  isUserCanDelete,
  idPost
}: CommentProps) {

  // Using useQueryClient hook to get an instance of the query client
  const qClient = useQueryClient()

  // Defining a constant variable for toast ID
  const deleteCommentToast = "deleteCommentToast"
  
  // Using useMutation hook to define a mutation function that deletes a comment
  const mutation = useMutation(
    (id: string) => axios.delete(`/api/comments/deleteComment?id=${id}`),
    {
      // Handling errors during mutation
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.msg, {id: deleteCommentToast})
        }
      },
      // Handling successful mutation
      onSuccess: (data) => {
        qClient.invalidateQueries([idPost])
        toast.success("Комментарий удален", {id: deleteCommentToast})

      },
    }
  )

  // Function to handle deletion of comment
  function handleDeleteComment() {
    toast.loading("Удаляем комментарий", {id: deleteCommentToast})
    mutation.mutate(id)
  }

  // Returning the JSX code for Comment component
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
        {(isUserCanDelete && !mutation.isLoading) && (
          <div className="ml-auto flex items-center justify-center  hover:bg-teal-400 hover:rounded-full p-1">
            <button onClick={handleDeleteComment}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <p className="text-sm py-3 ml-8">{message}</p>
    </div>
  )
}