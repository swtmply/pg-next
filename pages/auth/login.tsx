import Layout from "@/components/Layout";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  return (
    <Layout>
      <form
        className="flex flex-col gap-2 w-64 justify-center"
        onSubmit={async (e) => {
          e.preventDefault();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = await signIn("credentials", {
            redirect: false,
            email,
          });

          if (!data?.ok) setError("Something went wrong.");

          router.push("/");
        }}
      >
        <h1 className="font-bold text-3xl mb-4">Login</h1>
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
        />
        <span className="mb-2 text-xs text-red-600">{error}</span>
        <button type="submit" className="p-2 bg-neutral-800 text-white rounded">
          Submit
        </button>
      </form>
      <Link href="/auth/register">
        <a className="text-sm underline">Register account.</a>
      </Link>
    </Layout>
  );
};

export default Login;
