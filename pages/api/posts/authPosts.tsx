import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //получаем объект сессии
    const session = await getServerSession(req, res, authOptions)
    //если сессии нет, то просим залогинится
    if (!session)
      return res
        .status(401)
        .json({
          msg: "Пожалуйста залогинтесь для того что бы проучить свои записи.",
        })

    //если данные сессии есть то используя email можем получить данные пользователя из БД
    //получение данных пользователя

    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email as string,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res
        .status(403)
        .json({
          err: "При получении ваших постов возникла ошибка. Обратитесь к администратору.",
        })
    }
  }
}
