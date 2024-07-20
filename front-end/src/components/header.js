"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

import StypeBook from "@/services/book/typeBook";
import { useParams, usePathname } from "next/navigation";

export default function Header() {
  const currentTypeBook = usePathname().split("/type-book/")[1] || "";

  function handleLogout() {
    if (confirm("Do you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("idUser");
      localStorage.removeItem("role");
      window.location.href = "/login";
    } else {
      alert("well come back");
    }
  }

  const [typeBook, setTypeBook] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const[role,setRole]=useState([]);

  useEffect(
    () => async () => {
      const response = await StypeBook();
      setTypeBook(response.data);
    },
    []
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const role = localStorage.getItem("role");
    if (role === "admin") {
      setRole(true);
    }else if(role === "user"){
      setRole(false);
    }
  }, [isLogin, role]);

  useEffect(() => {}, []);
  return (
    <main>
      <nav className="bg-gray-800  ">
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center ">
            <Link href={"/"}>
              <img
                src="https://cdn-icons-png.freepik.com/512/5320/5320512.png"
                className="h-14 w-auto"
              />
            </Link>
            <div className=" m-3 flex space-x-1">
              {typeBook?.map((item) => (
                <Link
                  key={item.id}
                  href={"/type-book/" + item.id}
                  className={` 
                       hover:bg-gray-700 hover:text-white
                    rounded-md px-3 py-2 text-sm font-medium ${
                      currentTypeBook == item.id
                        ? "bg-gray-700 text-white"
                        : "text-white"
                    }`}
                >
                  {item.nameType}
                </Link>
              ))}
            </div>
            <div className="ml-auto px-2 ">
              {isLogin ? (
                <Link
                  href={"/profile/" + localStorage.getItem("idUser")}
                  className="bg-blue-600 hover:bg-blue-400 hover:text-white text-black font-semibold py-2 px-4 rounded-full shadow-md mr-5 "
                >
                  profile
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  className="bg-blue-600 hover:bg-blue-400 hover:text-white text-black font-semibold py-2 px-4 rounded-full shadow-md mr-5 "
                >
                  Login
                </Link>
              )}

              {isLogin ? (
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-400 hover:text-white text-black font-semibold py-2 px-4 rounded-full shadow-md mr-5 "
                >
                  Logout
                </button>
              ) : (
                <Link
                  href={"/register"}
                  className="bg-blue-600 hover:bg-blue-400 hover:text-white text-black font-semibold py-2 px-4 rounded-full shadow-md mr-5 "
                >
                  register
                </Link>
              )}

              {role ? (
                <Link
                  href={"/settings"}
                  className="bg-blue-600 hover:bg-blue-400 hover:text-white text-black font-semibold py-2 px-4 rounded-full shadow-md mr-5 "
                >
                  Settings
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}
