import Link from "next/link";
import { useState, useEffect } from "react";

export default function DropdownCategoryBook({ category, nameCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className=" no-select hidden-caret inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={handleClick}
        >
          {nameCategory || "Chọn thể loại"}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {category?.map((item) => (
              <Link
                href={`/category-book/${item.id}`}
                key={item.id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {item.nameCategory}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
