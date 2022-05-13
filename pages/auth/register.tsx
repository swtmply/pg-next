import Layout from "@/components/Layout";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <Layout>
      <form
        className="flex flex-col gap-2 w-64 justify-center"
        onSubmit={async (e) => {
          e.preventDefault();

          if (name === "" || email === "")
            return setError("Please fill all the fields");

          const data = await axios
            .post("/api/auth/register", { email, name })
            .then((res) => res.data);

          if (data.error) setError("Something went wrong.");

          setMessage(data.message);
        }}
      >
        <h1 className="font-bold text-3xl mb-4">Register</h1>
        <p>{message}</p>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          className={
            "shadow-md bg-neutral-100 rounded px-2 py-1 " +
            `${error && "border border-red-600"}`
          }
          onBlur={() => setError("")}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          required
        />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          className={
            "shadow-md bg-neutral-100 rounded px-2 py-1 " +
            `${error && "border border-red-600"}`
          }
          onBlur={() => setError("")}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />
        <span className="mb-2 text-xs text-red-600">{error}</span>
        <button type="submit" className="p-2 bg-neutral-800 text-white rounded">
          Submit
        </button>
      </form>
      <Link href="/auth/login">
        <a className="text-sm underline">Login instead.</a>
      </Link>
    </Layout>
  );
};

export default Register;
