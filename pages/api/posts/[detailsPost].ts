import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    const postId = req.query?.detailsPost as string || ""

    try {
      const data = await prisma.post.findUnique({
        where: {
          id: postId
        }, 
        include: {
          comments: {
            orderBy: {
              createdAt: "desc"
            }, 
            include: {
              user: true
            }
          }, 
          user: true
        }
      })
      res.status(200).json(data)
    } catch (err) {
      res
        .status(403)
        .json({
          err: "При получении поста возникла ошибка. Обратитесь к администратору.",
        })
    }
  }
}