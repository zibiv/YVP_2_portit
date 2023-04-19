"use client"

type ToggleProps = {
  setToggle: (a: boolean) => void
  deletePost: () => void
}

export default function Toggle({ setToggle, deletePost }: ToggleProps) {

  return (
    <div
      className="fixed bg-gray-900/50 w-full h-full z-20 left-0 top-0"
      onClick={(e) => {
        setToggle(false)
      }}
    >
      <div
        className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-3 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Вы действительно хотите удалить этот пост?</h1>
        <h3 className="text-red-600 text-sm text-center">
          {" "}
          запись нельзя будет восстановить{" "}
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          <button
            className=" text-blue-500"
            onClick={(e) => {
              setToggle(false)
            }}
          >
            отмена
          </button>
          <button
            className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
            onClick={deletePost}
          >
            удалить
          </button>
        </div>
      </div>
    </div>
  )
}
