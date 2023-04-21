import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    const session = await getServerSession(req, res, authOptions);

    const postId = req.query?.detailsPost as string

    try {
      const data = await prisma.post.findUnique({
        where: {
          id: postId
        }, 
        include: {
          comments: {
            orderBy: {
              createdAt: "asc"
            }, 
            include: {
              user: true
            }
          }, 
          user: true
        }
      })



      res.status(200).json({...data, sessionEmail: session?.user?.email})
    } catch (err) {
      res
        .status(403)
        .json({
          err: "При получении поста возникла ошибка. Обратитесь к администратору.",
        })
    }
  }
}