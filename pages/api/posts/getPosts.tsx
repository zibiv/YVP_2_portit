import { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    try {
      const data = prisma.post.findMany()
      res.status(200).json(data)
    } catch(err) {
      res.status(403).json({ err: "Ошибка получения записей с сервера" })
    }
  }
}
