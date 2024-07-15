import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import { Inter } from "next/font/google";
import Link from "next/link";
import CBook from "@/component/book";
import { useState, useEffect } from "react";

export default function Home() {
  function checkToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("lỗi token: " + error);
    }
  }

  return (
    <main>
      <h1>Danh sách sản phẩm</h1>
      {checkToken()}
      <CBook />
      <div></div>
    </main>
  );
}
