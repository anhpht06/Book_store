"use client";

import React from "react";
import Sbook from "@/services/book/book";
import LayoutBook from "./layoutBook";
import { useState, useEffect } from "react";

export default function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Sbook();
      setBooks(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col m-6 ml-14">
      <div>
        <h1 className="text-xl font-bold mb-6">Tất cả các sách hiện có</h1>
      </div>
      <LayoutBook books={books} />
    </div>
  );
}
