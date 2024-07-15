import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CBook() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await axios.get("http://localhost:3333/books");
        console.log(data.data.data);

        setItems(data.data.data);
      } catch (error) {}
    };

    fetchItems();
  }, []);

  return (
    <div className="p-8 ">
      <ul class="  grid grid-cols-4 gap-10">
        {items.map((item) => (
          <li
            className="  bg-blue-400 text-center p-2 rounded-lg border border-gray-200 shadow-md"
            key={item.id}
          >
            <img  src={item.imageBook}>
            </img>
            {item.nameBook}
          </li>
        ))}
      </ul>
    </div>
  );  
}
