"use client";

import React from "react";
import Sbook from "@/services/book/book";
import { useState, useEffect } from "react";

export default function Book() {
  const [books, setBooks] = useState([]);

  useEffect(
    () => async () => {
      const response = await Sbook();
      setBooks(response.data);
    },
    []
  );

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.nameBook}</li>
        ))}
      </ul>
    </div>
  );
}
