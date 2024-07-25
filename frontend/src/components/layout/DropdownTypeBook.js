import React from "react";
import { useState, useEffect } from "react";

export default function DropdownTypeBook({ typeBook, setIdTypeBook }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameType, setnameType] = useState("");

  useEffect(() => {
    setnameType(typeBook[0].nameType);
    setIdTypeBook(typeBook[0].id);
  }, [typeBook]);
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={handleClick}
          >
            {nameType || "Chọn type book"}
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
              {typeBook?.map((item) => (
                <button
                  onClick={() => {
                    setIdTypeBook(item.id);
                    setnameType(item.nameType), setIsOpen(!isOpen);
                  }}
                  key={item.id}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  {item.nameType}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function getTypeBook(idType, nameType) {}
