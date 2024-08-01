"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import StypeBook from "@/services/book/typeBook";
import { usePathname } from "next/navigation";

import { getCartByIdUser } from "@/services/cart/cart";
import { getOrderByUser } from "@/services/order/order";

export default function Header() {
  const currentTypeBook = usePathname().split("/type-book/")[1] || "";

  const [amoutItemCart, setAmoutItemCart] = useState(0);
  const [amountItemOder, setAmountItemOder] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respones = await getCartByIdUser(localStorage.getItem("idUser"));
        console.log(respones);
        if (respones.status === "404") {
          setAmoutItemCart(0);
        } else {
          setAmoutItemCart(Object.keys(respones).length);
        }

        const respones2 = await getOrderByUser(localStorage.getItem("idUser"));
        if (respones2.status === "404") {
          setAmountItemOder(0);
        } else {
          setAmountItemOder(Object.keys(respones2).length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
  const [role, setRole] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await StypeBook();
      setTypeBook(response.data);
    };
    fetchData();
  }, []);
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
    } else if (role === "user") {
      setRole(false);
    }
  }, [isLogin, role]);

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
            <div className="ml-auto px-2 flex  ">
              <Link className="text-white mt-1 mr-9" href={"/cart"}>
                <div className="relative inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {amoutItemCart >= 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {amoutItemCart}
                    </span>
                  )}
                </div>
              </Link>
              <Link className="text-white mt-1 mr-9" href={"/order"}>
                <div className="relative inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  {amountItemOder >= 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {amountItemOder}
                    </span>
                  )}
                </div>
              </Link>
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
                <a
                  href={"/setting/add-type-book"}
                  className="bg-blue-600 hover:bg-blue-400 hover:text-white text-black font-semibold py-2 px-4 rounded-full shadow-md mr-5 "
                >
                  Quản lý
                </a>
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
