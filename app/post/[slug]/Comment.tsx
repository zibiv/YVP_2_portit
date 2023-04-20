'use client'

type CommentProps = {
  id: string,
  message: string, 
  userId: string
}

export default function Comment({ message } : CommentProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}