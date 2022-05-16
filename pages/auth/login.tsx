import Layout from "@/components/Layout";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Layout>
      <form
        className="flex flex-col gap-2 w-64 justify-center"
        onSubmit={async (e) => {
          e.preventDefault();

          setIsLoading(true);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const status: any = await signIn("credentials", {
            redirect: false,
            email,
          });

          if (status.error) {
            setError("Something went wrong");
          }

          setIsLoading(false);

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
        <button
          disabled={isLoading}
          type="submit"
          className={classNames(
            "p-2 bg-neutral-800 text-white rounded",
            "disabled:bg-neutral-300 disabled:text-neutral-400"
          )}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <Link href="/auth/register">
        <a className="text-sm underline">Register account.</a>
      </Link>
    </Layout>
  );
};

export default Login;
