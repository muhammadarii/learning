"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signInCredentials } from "@/lib/action";
import { LoginButton } from "../button";

const FormLogin = () => {
  const [state, formAction] = useActionState(signInCredentials, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          email
        </label>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          password
        </label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <LoginButton />
      <p className="text-sm font-light text-gray-500">
        Don&apos;t have an account yet?{" "}
        <Link href="/register">
          <span className="font-medium text-blue-600 hover:underline">
            Sign Up here
          </span>
        </Link>
      </p>
    </form>
  );
};

export default FormLogin;
