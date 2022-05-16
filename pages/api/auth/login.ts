import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { User } from "lib/interfaces";
import { PrismaClient } from "@prisma/client";

export default withIronSessionApiRoute(handler, sessionOptions);

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).json({ error: "User not found" });

  req.session.user = user as User;
  await req.session.save();

  return res.status(200).json({ ok: true });
}
