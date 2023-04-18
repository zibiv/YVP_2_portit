"use client"

export default function Toggle({
  setIsDelete,
}: {
  setIsDelete: (fn: (a: boolean) => boolean) => void
}) {
  function closeToggle() {
    setIsDelete((prev: boolean) => !prev)
  }
  return (
    <div
      className="fixed bg-teal-500/50 w-full h-full z-20 left-0 top-0"
      onClick={(e) => {
        closeToggle()
      }}
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6"
      onClick={(e) => e.stopPropagation()}>
        <h1>Вы действительно хотите удалить этот пост?</h1>
        <button className=" text-blue-500" onClick={(e) => {
          e.stopPropagation();
          closeToggle()}
        }>
          Отмена
        </button>
      </div>
    </div>
  )
}
