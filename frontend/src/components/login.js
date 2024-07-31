"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Slogin from "@/services/auth/login";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setToken(token);
      window.location.href = "/";
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await Slogin(email, password);

    try {
      if (response?.data) {
        window.location.href = "/";
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("idUser", response.profile?.[0].id);
        localStorage.setItem("role", response.profile?.[0].role);
      } else {
        setError(response.error);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  //show password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" flex justify-center bg-gray-500 fixed w-full h-full  ">
      <div className="flex justify-center items-center h-screen ">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <h1 className="text-center text-2xl mb-6 font-bold">LOGIN</h1>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Gmail
            </label>
            <input
              autoComplete="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                autoComplete="current-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <label className="block text-red-500 text-sm font-bold mb-2 mt-5">
              {error}
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300 hover:text-red-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <Link
              href="/register"
              className="bg-blue-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300 hover:text-red-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
