"use client";
import React from "react";
import { useState, useEffect } from "react";
import { SgetDetailBook } from "@/services/book/book";
import Link from "next/link";
import Image from "next/image";

export default function CdetailBook({ idBook, book }) {
  const [detailBook, setDetailBook] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    () => async () => {
      const respones = await SgetDetailBook(idBook);
      if (respones.status === "200") {
        setDetailBook(respones.data);
      } else if (respones.status === "404") {
        setError(respones.messages);
      }
    },
    []
  );
  return (
    <div className="flex flex-col m-6">
      <div className="flex flex-row">
        <h1 className="text-sm  mb-2">{book?.typeBook?.nameType}</h1>
        <h1 className="text-sm  mb-2 ml-1 mr-1">&gt; </h1>
        <h1 className="text-sm  mb-2">{book?.catetoryBook?.nameCategory}</h1>
      </div>
      <div className="flex flex-row ">
        <div>
          <Image
            className="rounded-2xl"
            src={book?.imageBook}
            alt="Picture of the book"
            width={350}
            height={350}
          />
        </div>

        <div>vung 2</div>
      </div>
    </div>
  );
}
