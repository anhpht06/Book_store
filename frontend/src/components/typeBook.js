import React from "react";
import ScategoryBook from "../services/book/categoryBook";
import DropdownCategoryBook from "./DropdownCategoryBook";

import { useState, useEffect } from "react";
import { SgetTypeBookById } from "../services/book/typeBook";
export default function CtypeBook({ id }) {
  const [category, setCategory] = useState([]);
  const [typeBook, setTypeBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await ScategoryBook(id);
      setCategory(res1.data);
      console.log(res1.data);
      const res2 = await SgetTypeBookById(id);
      setTypeBook(res2.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex  items-center  m-5 ml-10 mt-10 ">
      <h1 className="text-5xl font-bold ">{typeBook?.nameType}</h1>

      <div className="ml-6">
        <DropdownCategoryBook category={category} />
      </div>
    </div>
  );
}
