import React from "react";
import ScategoryBook from "../services/book/categoryBook";
import DropdownCategoryBook from "./DropdownCategoryBook";

import { useState, useEffect } from "react";
import { SgetTypeBookById } from "../services/book/typeBook";
import { getBookByIdTypeBook } from "@/services/book/book";
import LayoutBook from "./layoutBook";
export default function CtypeBook({ typeBookID }) {
  const [category, setCategory] = useState([]);
  const [typeBook, setTypeBook] = useState([]);
  const [book, setBook] = useState([]);

  if (typeBookID === "undefined") return;
  useEffect(() => {
    const fetchData = async () => {
      const res1 = await ScategoryBook(typeBookID);
      setCategory(res1.data);
      const res2 = await SgetTypeBookById(typeBookID);
      setTypeBook(res2.data);
      const res3 = await getBookByIdTypeBook(typeBookID);
      setBook(res3.data);
    };
    fetchData();
  }, [typeBookID]);

  return (
    <div className="flex flex-col m-5 ml-10 mt-10 ">
      <div className="flex flex-row items-center ">
        <h1 className="text-5xl font-bold  no-select hidden-caret ">
          {typeBook?.nameType}
        </h1>
        <div className="ml-6">
          <DropdownCategoryBook category={category} />
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-xl mt-6 no-select hidden-caret">
          Tất các sách thuộc {typeBook?.nameType}
        </h1>
        <div className="mt-6">
          <LayoutBook books={book} />
        </div>
      </div>
    </div>
  );
}
