"use client";

import React from "react";
import Sbook from "@/services/book/book";
import LayoutBook from "./layoutBook";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Sbook();
      setBooks(response.data);
    };
    fetchData();
  }, []);

  if (!books)
    return (
      <div className="flex  justify-center  ">
        <Image
          src={"/images/no-data-6.png"}
          width={400}
          height={400}
          alt="empty-cart"
        />
      </div>
    );
  return (
    <div className="flex flex-col m-6 ml-14 ">
      <div>
        <h1 className="text-xl font-bold mb-6 no-select hidden-caret">Tất cả các sách hiện có</h1>
      </div>
      <LayoutBook books={books} />
    </div>
  );
}
