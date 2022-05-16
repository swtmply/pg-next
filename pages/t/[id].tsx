import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import prisma from "lib/prisma";
import Layout from "@/components/Layout";
import { Todo } from "lib/interfaces";
import { updateTodo } from "pages";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { todo },
  };
};

const fetchTodo = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const deleteTodo = async (data: Todo) => {
  const res = await axios
    .delete(`/api/todo/${data.id}`)
    .then((res) => res.data);

  return res;
};

const TodoId: NextPage<{ todo: Todo }> = ({ todo }) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState<boolean>(false);

  const { data, mutate } = useSWR<Todo>(`/api/todo/${todo.id}`, fetchTodo, {
    fallbackData: todo,
  });

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-bold text-3xl">
            {data?.content}{" "}
            <span className="text-xs italic text-neutral-500 font-normal">
              {data?.isDone ? "Done" : "Not Done"}
            </span>
          </h1>
          <p>By: {data?.author.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDeleting((prev) => !prev)}
            className="py-2 px-4 border border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 rounded"
          >
            Delete todo
          </button>
          <button
            onClick={async () => {
              await updateTodo({ ...(data as Todo), isDone: !data?.isDone });

              mutate();
            }}
            className="py-2 px-4 bg-neutral-800 hover:bg-neutral-900 text-white rounded"
          >
            Update todo
          </button>
        </div>

        {deleting && (
          <div>
            <p className="mb-2">Are you sure you want to delete this todo?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleting((prev) => !prev)}
                className="py-2 px-4 border border-neutral-800 hover:border-neutral-900 text-neutral-800 hover:text-neutral-900 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteTodo(data as Todo);

                  router.push("/");
                }}
                className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete todo
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TodoId;
