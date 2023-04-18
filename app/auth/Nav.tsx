import Link from "next/link"

//components
import Login from "./Login"
import Logged from "./Logged"

//auth
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function Nav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="flex justify-between py-8 items-center">
      <Link href={"/"}>
        <h1>Send it.</h1>
      </Link>
      <ul className="flex items-center gap-6 ml-2">
        {!!session ? <Logged userPick={session.user?.image || "https://placekitten.com/100/100"} /> : <Login />}
      </ul>
    </nav>
  )
}
