"use client";
import React from "react";
import { useState, useEffect } from "react";
import { SgetDetailBook } from "@/services/book/book";
import Link from "next/link";
import Image from "next/image";
import { createCart } from "@/services/cart/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCartByIdBook } from "@/services/cart/cart";
import { Button } from "@headlessui/react";

export default function CdetailBook({ book }) {
  const [isReload, setIsReload] = useState(false);
  const [detailBook, setDetailBook] = useState([]);

  const [isLove, setIsLove] = useState(true);
  const [isShowFullText, setIsShowFullText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //data sent to backend
  const [amout, setAmout] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [amoutCart, setAmoutCart] = useState(0);
  const [amoutTextAddbyCart, setAmoutTextAddbyCart] = useState("");

  function toastify(messages, isAddToCart) {
    if (isAddToCart) {
      toast.success(messages);
    } else {
      toast.error(messages);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const respones = await SgetDetailBook(book?.id);

      if (respones?.status === "200") {
        setDetailBook(respones?.data);
        setQuantity(respones?.data.amount);
      } else if (respones?.status === "404") {
        setError(respones?.messages);
      }

      const responesCart = await getCartByIdBook(
        localStorage.getItem("idUser"),
        book?.id
      );
      setAmoutCart(responesCart[0]?.amount);
    };
    fetchData();
  }, [isReload]);

  if (amout < 1) {
    setAmout(1);
  }
  useEffect(() => {
    if (amout > quantity) {
      setAmout(quantity);
    }
    if (amout < 1) {
      setAmout(1);
    }
  }, [amout]);

  async function handlerAddToCart() {
    if (!localStorage.getItem("token")) {
      toastify("Please login first", false);
      return;
    }
    if (Number(amout) + Number(amoutCart) > Number(quantity)) {
      setAmoutTextAddbyCart("The number of books in stock is not enough");
      return;
    }
    setAmoutTextAddbyCart("");
    const data = {
      user_id: localStorage.getItem("idUser"),
      book_id: book?.id,
      amount: amout,
    };

    setIsLoading(true);
    try {
      const respones = await createCart(data);
      toastify("Add to cart success", true);

      setIsReload(!isReload);

      return respones;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  async function handlerBuyProduct() {
    if (!localStorage.getItem("token")) {
      toastify("Please login first", false);
      return;
    }
    const data = {
      user_id: localStorage.getItem("idUser"),
      book_id: book?.id,
      amount: amout,
    };

    const respones = await createCart(data);

    window.location.href = "/checkout/" + respones.id;
  }
  function handleClickIsLove() {
    setIsLove(!isLove);
  }
  function handleShowFuullText() {
    setIsShowFullText(!isShowFullText);
  }

  return (
    <div className="flex flex-col m-6 no-select hidden-caret">
      <div className="flex flex-row ">
        <Link
          href={`/type-book/${book?.typeBook?.id}`}
          className="text-sm  mb-2"
        >
          {book?.typeBook?.nameType}
        </Link>
        <h1 className="text-sm  mb-2 ml-1 mr-1 no-select hidden-caret">
          &gt;{" "}
        </h1>
        <Link
          href={`/category-book/${book?.catetoryBook?.id}`}
          className="text-sm  mb-2 no-select hidden-caret"
        >
          {book?.catetoryBook?.nameCategory}
        </Link>
      </div>
      <div className="flex flex-row  ">
        <div className="basic-1/3">
          <Image
            className="rounded-lg"
            src={book?.imageBook || "/images/no-image.png"}
            width={200}
            height={200}
            alt={book.nameBook}
            style={{ width: "auto", height: "auto" }}
            priority={true}
          />
        </div>

        <div className="ml-12 flex flex-col divide-y divide-gray-500 basis-3/6 no-select hidden-caret">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold mb-2 no-select hidden-caret">
              {book?.nameBook}
            </h1>

            <div className="flex flex-row no-select hidden-caret ">
              <h1>5.0 </h1>
              <h1 className="ml-1">★★★★★</h1>
              <h1 className="ml-8"> 5 đánh giá </h1>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col">
                <h1>Tác giả</h1>
                <h1 className="font-bold">{book?.auther?.name}</h1>
              </div>

              <div className="flex flex-col ml-20">
                <h1>Thể loại</h1>
                <h1 className="font-bold">
                  {book?.catetoryBook?.nameCategory || "NaN"}
                </h1>
              </div>

              <div className="flex flex-col ml-20">
                <h1>Nhà xuất bản</h1>
                <h1 className="font-bold">{detailBook?.publisher || "NaN"}</h1>
              </div>

              <div className="flex flex-col ml-20">
                <h1>Số lượng sách</h1>
                <h1 className="font-bold text-center">
                  {detailBook?.amount || "0"}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <h1 className="mt-2">
              {" "}
              {"giá tiền: "}
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "1.5em",
                }}
              >
                {`${detailBook?.price}$`}
              </span>
            </h1>
            <h1 className="mt-1 text-sm text-red-500">{amoutTextAddbyCart}</h1>
            <div className="flex gap-2 mt-5 ">
              <label>Số lượng: </label>
              <input
                max={detailBook?.amount}
                min={1}
                value={amout}
                onChange={(e) => setAmout(e.target.value)}
                className="border border-black rounded-sm  w-14"
                type="number"
              />
            </div>

            <div className="flex row mt-3">
              {detailBook?.amount >= 1 ? (
                <button
                  type="button"
                  onClick={handlerAddToCart}
                  className=" mr-3 border border-green-500 bg-green-300 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full flex items-center"
                >
                  <svg
                    className="w-4 h-4 text-black mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isLoading ? "Loading..." : "Thêm vào giỏ hàng"}
                </button>
              ) : (
                <button
                  disabled
                  type="button"
                  className=" mr-3 border border-gray-500 bg-gray-300  text-black font-bold py-2 px-4 rounded-full flex items-center"
                >
                  <svg
                    className="w-4 h-4 text-black mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isLoading ? "Loading..." : "Thêm vào giỏ hàng"}
                </button>
              )}

              {detailBook?.amount >= 1 ? (
                <Button
                  type="button"
                  onClick={handlerBuyProduct}
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full flex items-center"
                >
                  <svg
                    strokeLinecap="round"
                    className="w-4 h-4 text-gray-500 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2C4 1.44772 4.44772 1 5 1H19C19.5523 1 20 1.44772 20 2V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V2ZM5 0C3.34315 0 2 1.34315 2 3V21C2 22.6569 3.34315 24 5 24H19C20.6569 24 22 22.6569 22 21V3C22 1.34315 20.6569 0 19 0H5ZM5 3H19V21H5V3ZM9 8C8.44772 8 8 8.44772 8 9V13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13V9C16 8.44772 15.5523 8 15 8H9ZM9 9H15V13H9V9ZM7 4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4C17 4.55228 16.5523 5 16 5H8C7.44772 5 7 4.55228 7 4Z"
                      fill="#000000"
                    />
                  </svg>
                  Mua sách
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled
                  // onClick={handlerBuyProduct}
                  className="bg-gray-400  text-white font-bold py-2 px-4 rounded-full flex items-center"
                >
                  <svg
                    strokeLinecap="round"
                    className="w-4 h-4 text-gray-500 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2C4 1.44772 4.44772 1 5 1H19C19.5523 1 20 1.44772 20 2V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V2ZM5 0C3.34315 0 2 1.34315 2 3V21C2 22.6569 3.34315 24 5 24H19C20.6569 24 22 22.6569 22 21V3C22 1.34315 20.6569 0 19 0H5ZM5 3H19V21H5V3ZM9 8C8.44772 8 8 8.44772 8 9V13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13V9C16 8.44772 15.5523 8 15 8H9ZM9 9H15V13H9V9ZM7 4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4C17 4.55228 16.5523 5 16 5H8C7.44772 5 7 4.55228 7 4Z"
                      fill="#000000"
                    />
                  </svg>
                  Mua sách
                </Button>
              )}

              <button
                onClick={handleClickIsLove}
                type="button"
                className={
                  isLove
                    ? "ml-20 border border-red-500  hover:border-red-600 hover:text-red-600 text-black font-bold py-1 px-2 rounded-full flex items-center"
                    : "ml-20 border border-red-500 bg-red-500 text-white font-bold py-1 px-2 rounded-full flex items-center"
                }
              >
                <svg
                  strokeLinecap="round"
                  className="size-6 hover:stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <p
              onClick={handleShowFuullText}
              className={
                isShowFullText
                  ? "mt-12 line-clamp-4 text-justify"
                  : "mt-12 line-clamp-none text-justify"
              }
            >
              {detailBook?.description}
            </p>

            <h1 className="mt-12 font-bold">
              Khách hàng nói gì về '{book?.nameBook}'{" "}
            </h1>
            <h1 className="mt-2 font-bold text-green-600">
              Đánh giá & nhật xét
            </h1>
          </div>

          <div className="flex flex-col mt-3 bg-gray-500 shadow-sm rounded-md">
            <div className=" mt-2 flex flex-row ">
              <div className="flex flex-row w-full h-full ">
                <div className="flex flex-col m-4">
                  <h1 className="text-5xl font-bold">5.0</h1>
                  <h1 className="mt-1 text-sm">5 đánh giá</h1>
                </div>

                <div className="ml-4">
                  <div className="mt-4 flex flex-col justify-end items-end">
                    <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                    <span className="text-yellow-400 text-lg">⭐⭐⭐⭐</span>
                    <span className="text-yellow-400 text-lg">⭐⭐⭐</span>
                    <span className="text-yellow-400 text-lg">⭐⭐</span>
                    <span className="text-yellow-400 text-lg">⭐</span>
                  </div>
                </div>
                <div className="basis-3/4 mr-4 ml-4 mt-7">
                  <div className="bg-gray-600 h-2 rounded-lg flex-grow ml-2">
                    <div
                      className="bg-yellow-400 h-full rounded-lg"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="bg-gray-600 h-2 rounded-lg flex-grow ml-2 mt-5">
                    <div
                      className="bg-yellow-400 h-full rounded-lg"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <div className="bg-gray-600 h-2 rounded-lg flex-grow ml-2 mt-5">
                    <div
                      className="bg-yellow-400 h-full rounded-lg"
                      style={{ width: "50%" }}
                    />
                  </div>
                  <div className="bg-gray-600 h-2 rounded-lg flex-grow ml-2 mt-5">
                    <div
                      className="bg-yellow-400 h-full rounded-lg"
                      style={{ width: "25%" }}
                    />
                  </div>
                  <div className="bg-gray-600 h-2 rounded-lg flex-grow ml-2 mt-5">
                    <div
                      className="bg-yellow-400 h-full rounded-lg"
                      style={{ width: "5%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mr-10 mb-4">
              <button className="w-40 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                <svg
                  strokeLinecap="round"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21H7V9h2v12zm8-2H11V5h2V3h2v2h2v14zm-8-4h8V5h2v10H9v-2zm-8-3H7V3H5v9H1v2z" />
                </svg>
                Viết đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
