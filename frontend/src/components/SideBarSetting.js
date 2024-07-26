"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SideBarSetting() {
  const [path, setPath] = useState(usePathname().split("/setting/")[1] || "");

  return (
    <div className="bg-gray-100 m-3">
      <title>Setting</title>
      <aside className="bg-gray-800 text-black w-64 min-h-screen p-4 rounded-lg">
        <nav>
          <div className="flex flex-col space-y-6">
            <Link
              href={`/setting/add-type-book`}
              className={` 
                       hover:bg-gray-700 hover:text-white
                    rounded-md px-3 py-2  ${
                      path === "add-type-book"
                        ? "bg-green-500 text-white"
                        : " bg-red-500 text-white"
                    }`}
            >
              Type book
            </Link>
            <Link
              href={`/setting/add-category`}
              className={` 
                0
                hover:bg-gray-700 hover:text-white
                
             rounded-md px-3 py-2  ${
               path === "add-category"
                 ? " bg-green-500 text-white"
                 : "bg-red-500 text-white"
             }`}
            >
              Category book
            </Link>
            <Link
              href={`/setting/add-auther`}
              className={` 
                hover:bg-gray-700 hover:text-white
             rounded-md px-3 py-2  ${
               path === "add-auther"
                 ? "bg-green-500 text-white"
                 : "bg-red-500 text-white"
             }`}
            >
              Auther
            </Link>
            <Link
              href={`/setting/add-book`}
              className={` 
                hover:bg-gray-700 hover:text-white
             rounded-md px-3 py-2  ${
               path === "add-book"
                 ? "bg-green-500 text-white"
                 : "bg-red-500 text-white"
             }`}
            >
              Book
            </Link>
            <Link
              href={`/setting/list-user`}
              className={` 
                hover:bg-gray-700 hover:text-white
             rounded-md px-3 py-2  ${
               path === "list-user"
                 ? "bg-green-500 text-white"
                 : "bg-red-500 text-white"
             }`}
            >
              List user
            </Link>
            <Link
              href={`/setting/list-purchase`}
              className={` 
                hover:bg-gray-700 hover:text-white
             rounded-md px-3 py-2  ${
               path === "list-purchase"
                 ? "bg-green-500 text-white"
                 : "bg-red-500 text-white"
             }`}
            >
              List purchase
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}
