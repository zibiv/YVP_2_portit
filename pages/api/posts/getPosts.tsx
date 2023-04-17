import { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    try {
      const data = await prisma.post.findMany({
        include: {
          user: true
        },
        orderBy: {
          createdAt: "desc"
        }
      })
      console.log(data)
      res.status(200).json(data)
    } catch(err) {
      res.status(403).json({ err: "Ошибка получения записей с сервера" })
    }
  }
}
