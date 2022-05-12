import Layout from "@/components/Layout";
import type { GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma";
import { Todos } from "lib/types";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const todos = await prisma.todo.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { todos } };
};

const Home: NextPage<Todos> = ({ todos }) => {
  return (
    <Layout>
      {todos.map((todo) => (
        <Link key={todo.id} href={`/t/${todo.id}`} passHref>
          <div className="border border-black p-4 cursor-pointer">
            <h2 className="font-bold text-2xl">{todo.content}</h2>
            <p>{todo.author.name}</p>
          </div>
        </Link>
      ))}
    </Layout>
  );
};

export default Home;
