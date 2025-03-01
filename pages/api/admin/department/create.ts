import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  users?: object[],
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({req});
  if (reqSession && reqSession?.user?.role == "admin") {
    const { name, budget } = req.body
    const department = await prisma.department.create({
      data: {
        name,
        budget: Number(budget)
      }
    })
     return res.status(200).json({  department })
  }
  res.status(500).json({error: "not authorized"})
}


