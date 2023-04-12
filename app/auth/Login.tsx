'use client' 

import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <li className='list-none'>
      <button className='text-sm bg-gray-700 text-white py-2 px-6 rounded-2xl disabled:opacity-25' onClick={(e) => signIn()}>Sign IN</button>
    </li>
  )
}