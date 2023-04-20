"use client"

import { FormEvent, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "react-hot-toast"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const qClient = useQueryClient()
  let toastPostId: string = "addPostToast"

  function resetForm() {
    setIsDisabled(false)
    setTitle("")
  }

  //create post
  const mutation = useMutation(
    (title: string) => axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {

        if (error instanceof AxiosError) {
          toast.error("Ошибка: \n" + error?.response?.data.msg, { id: toastPostId })
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        resetForm()
        qClient.invalidateQueries(["posts"])
        toast.success("Запись добавлена", { id: toastPostId })
        console.warn("OK")
        //обновление списка постов данного пользователя в компоненте ...
      },
    }
  )

  useEffect(() => {
    if (title.length > 300) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [title])

  async function submitPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsDisabled(true)
    toast.loading("Создаем вашу запись", {id: toastPostId})
    mutation.mutate(title)
  }

  return (
    <form
      className="bg-white my-8 p-8 rounded-xl shadow-sm"
      onSubmit={submitPost}
    >
      <div className="flex flex-col my-4">
        <textarea
          className="text-lg rounded-md p-4 my-2 bg-gray-200
          focus:outline-none focus:ring-1 focus:ring-teal-500"
          name="title"
          value={title}
          id="title"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="Запишите свои мысли здесь…"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-semibold text-sm ${
            title.length > 300 ? "text-red-300" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          type="submit"
          className="bg-teal-600 rounded-xl px-6 py-2 text-white text-sm disabled:opacity-25"
          disabled={isDisabled}
        >
          Создать
        </button>
      </div>
    </form>
  )
}
