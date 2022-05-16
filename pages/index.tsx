import Layout from "@/components/Layout";
import type { GetServerSideProps, NextPage } from "next";
import prisma from "lib/prisma";
import { Todos } from "lib/types";
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Todo } from "lib/interfaces";
import useSWR, { mutate } from "swr";
import classNames from "classnames";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

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
  return { props: { todos, session } };
};

const fetchTodos = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const updateTodo = async (data: Todo) => {
  const res = await axios
    .patch(`/api/todo/${data.id}`, data)
    .then((res) => res.data);

  return res;
};

const Home: NextPage<Todos> = ({ todos }) => {
  const router = useRouter();

  const { data, error } = useSWR("/api/todo", fetchTodos, {
    fallbackData: todos,
  });

  return (
    <Layout>
      <div className="flex justify-end my-4">
        <div className="flex gap-4">
          <Button onClick={() => router.push("/create")}>Add Todo</Button>
          <button
            onClick={() => signOut()}
            className="py-2 px-4 bg-neutral-800 hover:bg-neutral-900 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {error ? (
        <p>{error.message}</p>
      ) : (
        data.map((todo: Todo) => (
          <Link key={todo.id} href={`/t/${todo.id}`}>
            <div className="border border-black p-4 cursor-pointer hover:bg-neutral-100 mb-3 flex items-center gap-4">
              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  await updateTodo({ ...todo, isDone: !todo.isDone });

                  mutate("/api/todo");
                }}
                className={classNames(
                  todo.isDone ? "text-green-400" : "text-gray-300"
                )}
              >
                <CheckCircleIcon
                  className={`w-12 h-12 hover:text-green-500 `}
                />
              </button>
              <div>
                <h2 className="font-bold text-2xl">{todo.content}</h2>
                <p>{todo.author.name}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </Layout>
  );
};

export default Home;
