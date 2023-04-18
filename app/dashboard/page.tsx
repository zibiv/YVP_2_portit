

import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import Redirect from "./redirect"
import Login from "../auth/Login"


export default async function Dashboard() {
  const session = await getServerSession(authOptions)


  if(!session) {
    return (
      <div className="flex items-center h-[50vh] ">
        <div className="flex items-center justify-center gap-5 flex-col bg-white my-2 p-8 rounded-xl shadow-sm w-[100%] h-50">
          <h1 className="text-xl">Please sing in</h1>
          <Login />
        </div>
      </div>
    )
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome {session?.user?.name}{" "}</h1>
    </main>
  )
}