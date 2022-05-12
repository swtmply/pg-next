import { GetServerSideProps, NextPage } from "next";
import React from "react";
import prisma from "lib/prisma";
import Layout from "@/components/Layout";
import { Todo } from "lib/interfaces";

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

const TodoId: NextPage<{ todo: Todo }> = ({ todo }) => {
  return (
    <Layout>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </Layout>
  );
};

export default TodoId;
