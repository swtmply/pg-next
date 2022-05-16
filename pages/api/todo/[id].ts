import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "PATCH":
      const updatedTodo = await prisma.todo.update({
        where: {
          id: id as string,
        },
        data: {
          isDone: req.body.isDone,
          content: req.body.content,
        },
      });

      if (!updatedTodo)
        return res.status(401).json({ message: "Something went wrong" });

      return res.status(200).json(updatedTodo);
    case "DELETE":
      const deletedTodo = await prisma.todo.delete({
        where: {
          id: id as string,
        },
      });

      if (!deletedTodo)
        return res.status(401).json({ message: "Something went wrong" });

      return res
        .status(200)
        .json({ message: `Deleted todo id ${deletedTodo.id}` });
    default:
      const todo = await prisma.todo.findUnique({
        where: {
          id: id as string,
        },
        include: {
          author: {
            select: { name: true },
          },
        },
      });

      return res.status(200).json(todo);
  }
}
