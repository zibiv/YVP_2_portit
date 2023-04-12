"use client"

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Logged() {
  return (
    <li className="flex gap-8 items-center list-none">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        onClick={(e) => signOut()}
      >
        Log OUT
      </button>
    </li>
  )
}
