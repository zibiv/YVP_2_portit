import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 

  if(req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if(!session) 
      return res.status(401).json({ msg: "Пожалуйста залогинтесь для того что бы разместить запись"})
      
    //получение данных пользователя
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string
      }
    })

    if(!user)
      return res.status(404).json({ msg: "Такого пользователя не существует" })


    const title: string = req.body.title

    if(title.length > 300 || title.length === 0) 
      return res.status(403).json({ msg: "Ваше сообщение либо большое 300 символов или пустое" })

    //создаем пост
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: user.id
        }
      })
      res.status(200).json(result)
    } catch(err) {
      res.status(403).json({ err: "При создании записи возникла ошибка" })
    }
  }
}