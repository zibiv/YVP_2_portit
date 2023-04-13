"use client"

import { useEffect, useState } from "react"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (title.length > 300) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [title])

  return (
    <form className="bg-white my-8 p-8 rounded-xl shadow-sm">
      <div className="flex flex-col my-4">
        <textarea
          className="text-lg rounded-md p-4 my-2 bg-gray-200"
          name="title"
          value={title}
          id="title"
          onChange={(e) => {setTitle(e.target.value)}}
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
