"use client";
import React from "react";
import CdetailBook from "@/components/detailBook";
import { useState, useEffect } from "react";
import { SgetBookById } from "@/services/book/book";

export default function page({ params }) {
  const [book, setBook] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(
    () => async () => {
      const respones = await SgetBookById(params.id);

      if (respones?.status === "200") {
        setBook(respones?.data);
      } else if (respones?.status === "404") {
        setNotFound(true);
      }
      setIsClient(true);
    },
    []
  );
  return (
    <>
      {isClient ? (
        <div>
          {notFound ? (
            "Not Found"
          ) : (
            <CdetailBook idBook={params.id} book={book} />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
