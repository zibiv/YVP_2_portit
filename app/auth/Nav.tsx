import Link from "next/link"

//components
import Login from "./Login"
import Logged from "./Logged"

//auth
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function Nav() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <nav className="flex justify-between py-8 items-center">
      <Link href={"/"}>
        <h1>Send it.</h1>
      </Link>
      <div className="ml-auto">
        <h3>Hello {!!session ? session.user!.name : "friend"}</h3>
      </div>
      <ul className="flex items-center gap-6 ml-2">
        {!!session ? <Logged userPick={session.user?.image || "https://placekitten.com/100/100"} /> : <Login />}
      </ul>
    </nav>
  )
}
