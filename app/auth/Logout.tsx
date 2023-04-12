'use client' 

import { signOut } from 'next-auth/react'

export default function Logout() {
  return (
    <li className='list-none'>
      <button className='text-sm bg-gray-700 text-white py-2 px-6 rounded-2xl disabled:opacity-25' onClick={(e) => signOut()}>Log OUT</button>
    </li>
  )
}