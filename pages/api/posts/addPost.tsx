import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 

  if(req.method === "POST") {
    //получаем объект сессии
    const session = await getServerSession(req, res, authOptions)
    //если сессии нет, то просим залогинится
    if(!session) 
      return res.status(401).json({ msg: "Пожалуйста залогинтесь для того что бы разместить запись."})
    
    //если данные сессии есть то используя email можем получить данные пользователя из БД
    //получение данных пользователя
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string
      }
    })

    //если пользователя с таким email в базе нет то отправляем 404 статус
    if(!user)
      return res.status(404).json({ msg: "Такого пользователя не существует." })

    //получаем название поста из тела запроса
    const title: string = req.body.title

    //проверяем условия связанные с размерами названия
    if(title.length > 300 || title.length === 0) 
      return res.status(403).json({ msg: "Ваше сообщение либо большое 300 символов или пустое." })

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
      res.status(403).json({ err: "При создании записи возникла ошибка. Обратитесь к администратору." })
    }
  }
}