"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"

export default function AddComment({ postId } : { postId: string }) {
  const [message, setMessage] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const qClient = useQueryClient();
  const addCommentToastId = "addTostId"

  const mutation = useMutation((message: string) =>
    axios.post("/api/comments/addComment", { message, postId }), 
    {
      onSuccess: (data) => {
        setMessage("")
        setIsDisabled(false)
        toast.success("Комментарий добавлен", {id: addCommentToastId})
        qClient.invalidateQueries(["postDetail",postId])
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("Ошибка: \n" + error?.response?.data.msg, {id: addCommentToastId})
        }
        setIsDisabled(false)
      }
    }
  )

  async function submitComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsDisabled(true)
    toast.loading("Добавляем комментарий", {id: addCommentToastId})
    mutation.mutate(message)
  }

  return (
    <form
      className="bg-white my-8 p-8 pb-3 rounded-xl shadow-sm"
      onSubmit={submitComment}
    >
      <h3 className="text-gray-800">Добавить комментарий: </h3>
      <div className="flex flex-col mt-2">
        <textarea
          className="bg-gray-200 text-lg p-4 my-2 rounded-md
        focus:outline-none focus:ring-1 focus:ring-teal-500"
          name="message"
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ваш комментарий"
        ></textarea>
        <button
          type="submit"
          className="bg-teal-600 rounded-xl px-6 py-2 my-2 self-end text-white text-sm disabled:opacity-25"
          disabled={isDisabled}
        >
          добавить
        </button>
      </div>
    </form>
  )
}