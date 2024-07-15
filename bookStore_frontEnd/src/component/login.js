import SLogin from "@/service/auth/login";

import { useState } from "react";
import axios from "axios";
import { comma } from "postcss/lib/list";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function ILogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, serError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const respone = await SLogin(email, password);
    if (respone?.data) {
      window.location.href = "/";
      localStorage.setItem("token", respone.data.data.token);
    } else {
      serError("Wrong Email or Password");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <img
        alt="Your Company"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1gJ-45u4WFQ_yGmUCJupz84q5LuxJQGWjA&s"
        className="mx-auto h-20 w-auto"
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>

          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
          <label className="block text-sm font-medium leading-6 text-red-600">
            {error}
          </label>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
