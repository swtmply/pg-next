import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email, name },
    method,
  } = req;

  if (method === "POST") {
    const user = await prisma.user.create({
      data: { name, email },
    });

    if (!user) return res.status(401).json({ error: "Something went wrong" });

    return res.status(200).json({
      message: "Registered successfully, You can now log in with your account",
    });
  }
}
