import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)
    //если сессии нет, то просим залогинится
    if (!session)
      return res
        .status(401)
        .json({
          msg: "Пожалуйста залогинтесь для того что бы удалить комментарий.",
        })

    const idCommentToDelete = req.query.id as string

    try {
      const result = await prisma.comment.delete({
        where: {
          id: idCommentToDelete,
        },
      })
      res.status(204).json(result)
    } catch (err) {
      res
        .status(403)
        .json({
          err: "При удалении комментария возникла ошибка. Обратитесь к администратору.",
        })
    }
  }
}
