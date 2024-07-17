"use client";

import React from "react";
import { useState, useEffect } from "react";
import ScategoryBook from "@/services/book/categoryBook";
export default function CategoryBook() {
  const [categoryBooks, setCategoryBooks] = useState([]);

  useEffect(
    () => async () => {
      const response = await ScategoryBook();
      console.log(response.data);
      setCategoryBooks(response.data);
    },
    []
  );

  return (
    <div>
      <ul>
        {categoryBooks.map((categoryBook) => (
          <li key={categoryBook.id}>
            {" "}
            {categoryBook.nameCategoty} thuộc {categoryBook.typeBook.nameType}{" "}
          </li>
        ))}
      </ul>
    </div>
  );  
}
