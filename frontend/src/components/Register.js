"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Sregister } from "@/services/auth/register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Password incorrect");
      setLoading(false);
      return;
    }

    if (email === "" || password === "" || confirmPassword === "") {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    } else {
      setError("");
      const data = {
        role: "user",
        email: email,
        password: password,
      };

      const response = await Sregister(data);
      if (response.status === "404") {
        toast.error(response.message);
        setLoading(false);
      } else {
        setLoading(false);

        toast.success("Register success");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showComfirmPassword);
  };
  return (
    <div>
      <div className=" flex justify-center bg-gray-500 fixed w-full h-full  ">
        <div className="flex justify-center items-center h-screen ">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <h1 className="text-center text-2xl mb-6 font-bold">Register</h1>
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
                {/* {error} */}
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  autoComplete="current-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type={showComfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Comfirm password "
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
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
                  {showComfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                {loading ? "Loading..." : "Sign up"}
              </button>
              <Link
                href="/login"
                className="bg-blue-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300 hover:text-red-500"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login now"}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
