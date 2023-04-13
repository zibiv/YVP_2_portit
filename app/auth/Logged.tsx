"use client"

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Logged({ userPick } : { userPick: string }) {
  console.log(userPick)
  return (
    <li className="flex gap-8 items-center list-none">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        onClick={(e) => signOut()}
      >
        Log OUT
      </button>
      <Link href={"/dashboard"}>
        <Image
          className="rounded-full w-16"
          src={userPick}
          alt="user picture"
          width={64}
          height={64}
        ></Image>
      </Link>
    </li>
  )
}
