import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)
    //если сессии нет, то просим залогинится
    if (!session)
      return res
        .status(401)
        .json({
          msg: "Пожалуйста залогинтесь для того что бы разместить запись.",
        })

    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    })

    if (!user)
      return res.status(404).json({ msg: "Такого пользователя не существует." })

    const usersPosts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
})

    res.status(200).json({ posts: usersPosts })

    console.log(usersPosts);
  }
}
