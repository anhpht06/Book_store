import React from "react";
import Book from "@/components/book";
export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-400">
      <title>Book Store</title>
      <Book />
    </div>
  );
}
