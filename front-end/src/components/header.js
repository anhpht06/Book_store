"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Header() {
  function handleLogout() {
    if (confirm("Do you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      alert("well come back");
    }
  }
  //check login => when login susecc change buton login to profile
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: false },
    { name: "Type Book", href: "/type-book", current: false },
    { name: "Category Book", href: "/category-book", current: false },
  ]);

  const handleNavigationClick = (href) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setNavigation(updatedNavigation);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <main>
      <nav className="bg-gray-800">
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center ">
            <img
              alt="Your Company"
              src="https://cdn-icons-png.freepik.com/512/5320/5320512.png"
              className="h-14 w-auto"
            />
            <div className=" m-3 flex space-x-1">
              {navigation.map((item) => (
                <Link
                  onClick={() => handleNavigationClick(item.href)}
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-auto px-2 ">
              {isLogin ? (
                <Link
                  href={"/profile"}
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
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}
