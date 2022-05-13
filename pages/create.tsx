import Layout from "@/components/Layout";
import React, { useState } from "react";
import axios from "axios";

const CreateTodo = () => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <Layout>
      <form
        className="flex flex-col gap-2 w-64 justify-center"
        onSubmit={async (e) => {
          e.preventDefault();

          // create todo query
          if (content === "") {
            setError("Field content is required");
          }

          const data = await axios
            .post("/api/todo", { content })
            .then((res) => res.data);

          setContent("");

          setMessage(data.message);
        }}
      >
        <h1 className="font-bold text-3xl mb-4">Add todo</h1>
        <p>{message}</p>
        <label>Content: </label>
        <input
          type="text"
          name="content"
          className={
            "shadow-md bg-neutral-100 rounded px-2 py-1 " +
            `${error && "border border-red-600"}`
          }
          onBlur={() => {
            setError("");
          }}
          value={content}
          onChange={(e) => {
            setMessage("");
            setContent(e.target.value);
            setError("");
          }}
        />
        <span className="mb-2 text-xs text-red-600">{error}</span>
        <button type="submit" className="p-2 bg-neutral-800 text-white rounded">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default CreateTodo;
