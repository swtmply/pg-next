import { PrismaClient } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { content },
    method,
    session: { user },
  } = req;

  if (!user) res.status(401).json({});

  switch (method) {
    case "POST":
      const todo = await prisma.todo.create({
        data: { content, author: { connect: { id: user?.id as string } } },
      });

      if (!todo)
        return res.status(401).json({ message: "Something went wrong" });

      return res.status(200).json({ message: "Todo created successfully" });

    default:
      const todos = await prisma.todo.findMany({
        where: {
          authorId: user?.id as string,
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
