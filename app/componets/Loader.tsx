"use client"

export default function Loader() {
  return (
    <div className="flex items-center">
      Загрузка{" "}
      <div className="ml-2 border-[5px] border-gray-300 border-t-[5px] border-t-teal-500 rounded-[100%] w-5 h-5 animate-spin"></div>
    </div>
  )
}
