"use client";

import React from "react";
import { SgetBookByIdCate } from "@/services/book/book";
import { SgetAllCategoryBook } from "../services/book/categoryBook";
import { useState, useEffect } from "react";
import LayoutBook from "./layoutBook";
import ScategoryBook from "../services/book/categoryBook";
import DropdownCategoryBook from "./DropdownCategoryBook";
import Link from "next/link";

export default function CcategoryBook({ id }) {
  const [books, setBooks] = useState([]);
  const [idType, setIdType] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await SgetBookByIdCate(id);
      setBooks(response?.data);
      setIdType(response?.data[0]?.typeBook?.id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ScategoryBook(idType);
      setCategory(response?.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col m-6 ml-14 no-select hidden-caret">
      <div className="flex flex-row  items-center">
        {books ? (
          <Link
            href={`/type-book/${idType}`}
            className="text-xl no-select hidden-caret "
          >
            {(books && books?.[0]?.typeBook?.nameType) || "Hiện không có này!"}
          </Link>
        ) : (
          <h1 className="no-select hidden-caret">Hiện ko có sách này!</h1>
        )}

        <img
          className="w-4 h-4 ml-1"
          src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
        ></img>

        <div>
          <DropdownCategoryBook
            category={category}
            nameCategory={
              books?.[0]?.catetoryBook?.nameCategory ||
              "Vui lòng chọn thể loại khác!"
            }
          />
        </div>
      </div>
      <div className="flex flex-col  mt-10">
        <h1 className="text-xl font-bold no-select hidden-caret">
          Tất cả các sách
        </h1>

        <div className=" mt-6">
          <LayoutBook books={books} />
        </div>
      </div>
    </div>
  );
}
