

import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Login from "../auth/Login"

import MyPosts from "./MyPosts"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  


  if(!session) {
    return (
      <div className="flex items-center h-[50vh] ">
        <div className="flex items-center justify-center gap-5 flex-col bg-white my-2 p-8 rounded-xl shadow-sm w-[100%] h-50">
          <h1 className="text-xl">Пожалуйста войдите</h1>
          <Login />
        </div>
      </div>
    )
  }
  


  return (
    <main>
      <h1 className="text-2xl font-bold">Привет <span className="text-teal-600">{session?.user?.name}</span>{" "}</h1>
      <MyPosts />
    </main>
  )
}