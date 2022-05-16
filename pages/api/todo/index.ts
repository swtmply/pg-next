import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { content },
    method,
  } = req;
  const session = await getSession({ req });

  switch (method) {
    case "POST":
      const todo = await prisma.todo.create({
        data: { content, author: { connect: { id: session?.id as string } } },
      });

      if (!todo)
        return res.status(401).json({ message: "Something went wrong" });

      return res.status(200).json({ message: "Todo created successfully" });

    default:
      const todos = await prisma.todo.findMany({
        where: {
          authorId: session?.id as string,
        },
        include: {
          author: {
            select: { name: true },
          },
        },
      });
      return res.status(200).json(todos);
  }
}
