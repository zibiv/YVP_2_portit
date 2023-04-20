import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method === "POST") {

    const session = await getServerSession(req, res, authOptions)

    if(!session)
    return res.status(401).json({ msg: "Пожалуйста залогинтесь для того что бы разместить запись."})

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string
      }
    })


    if(!user)
      return res.status(404).json({ msg: "Такого пользователя не существует." })

    const { message, postId } = req.body

    try {
      const data = await prisma.comment.create({
        data: {
          message,
          userId: user.id,
          postId: postId
        },
        include: {
          user: true
        }
      })

      res.status(200).json(data)
    } catch(err) {

      res.status(403).json({ err: "При добавлении комментария возникла ошибка. Обратитесь к администратору." })
    }



  }







}