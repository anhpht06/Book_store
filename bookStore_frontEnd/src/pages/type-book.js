import { TabList } from "@headlessui/react";
import STypeBook from "@/service/auth/book/typeBook";
import { useState, useEffect } from "react";

export default function TypeBook() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await STypeBook();

      setItems(data.data);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Loại sách</h1>
    <div className="p-10 ">
      <ul class="  grid grid-cols-4 gap-10">
        {items.map((item) => (
          <li className=" bg-blue-400 text-center p-5 bg-white rounded-lg border border-gray-200 shadow-md" key={item.id}>{item.nameType}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}
