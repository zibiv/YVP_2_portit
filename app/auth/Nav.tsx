import Link from "next/link"
import Login from "./Login"
import Logout from "./Logout"

export default async function Nav() {
  return (
    <nav className="flex justify-between py-8">
      <Link href={'/'}>
        <h1>Send it.</h1>
      </Link>
      {/* //client in here */}
      <ul className="flex items-center gap-6">
        <Login />
        <Logout />
      </ul>
    </nav>
  )
}
