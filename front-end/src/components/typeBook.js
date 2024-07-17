"use client";

import React from "react";
import StypeBook from "@/services/book/typeBook";

import { useState, useEffect } from "react";
export default function TypeBook() {
  const [typeBooks, setTypeBooks] = useState([]);

  useEffect(
    () => async () => {
      const response = await StypeBook();
      setTypeBooks(response.data);
      console.log(response.data);
    },
    []
  );

  return (
    <div>
      <ul>
        {typeBooks.map((typeBook) => (
          <li key={typeBook.id}>{typeBook.nameType}</li>
        ))}
      </ul>
    </div>
  );
}
