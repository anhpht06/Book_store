"use client";
import React from "react";
import { useState, useEffect } from "react";
import cart, {
  getCartByIdUser,
  deleteCart,
  updateCart,
} from "@/services/cart/cart";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { SgetDetailBook } from "@/services/book/book";

export default function Cart() {
  const [isloading, setIsloading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [amoutItem, setAmoutItem] = useState(0);
  const [carts, setCarts] = useState([]);
  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("idUser") == null)
        return (window.location.href = "/login");
      const response = await getCartByIdUser(localStorage.getItem("idUser"));
      if (response?.status === "404") {
        setAmoutItem(0);
        setCarts([]);
      } else {
        setAmoutItem(Object.keys(response).length);
        setCarts(response);

        let newSubtotal = subtotal;
        response.forEach((item) => {
          newSubtotal += item.books[0].detailBook.price * item.amount;
        });
        setSubtotal(newSubtotal);
      }
    };
    fetchData();
  }, [isRefresh]);

  async function handlePlusQuantity(book_id, amount) {
    const res = await SgetDetailBook(book_id);
    console.log("amount:", amount);
    if (amount >= res.data.amount) {
      toast.error("Số lượng sách trong kho không đủ");
      return;
    }

    const data = {
      user_id: localStorage.getItem("idUser"),
      book_id: book_id,
      amount: amount + 1,
    };
    console.log(data);
    const response = await updateCart(data);
    setIsRefresh(!isRefresh);
    setSubtotal(0);
  }

  async function handleMinusQuantity(book_id, amount) {
    console.log("amout:", amount);
    if (amount <= 1) {
      return;
    }
    const data = {
      user_id: localStorage.getItem("idUser"),
      book_id: book_id,
      amount: amount - 1,
    };
    const response = await updateCart(data);
    console.log("data::", response);
    setIsRefresh(!isRefresh);
    setSubtotal(0);
  }

  async function handleDeleteCart(id) {
    if (confirm("Do you want to delete?")) {
      await deleteCart(id);
      setIsRefresh(!isRefresh);
      toast.success("Delete success");
      setSubtotal(0);
    }
  }

  return (
    <div className="w-full h-full no-select hidden-caret">
      <div className=" ml-4 mt-6 flex flex-col">
        <h1 className="text-2xl font-bold">YOUR CART</h1>
        <h1>
          {`There are `}
          <span className="text-red-500">{amoutItem}</span>
          {` items in your cart`}
        </h1>

        <div className="flex gap-4 ">
          <div className="flex flex-col mt-3 basis-3/4">
            <table className=" table-fixed  ">
              <thead>
                <tr className="bg-gray-300 ">
                  <th className="text-start w-2/6 p-1 ">Product</th>
                  <th>Price</th>
                  <th className="w-1/5">Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {carts?.map((item, index) => (
                  <tr key={item.id} className="border-collapse">
                    <td className="p-1 ">
                      <div className="flex gap-4 px-2 py-2">
                        <Image
                          className="rounded-lg"
                          src={item.books[0].imageBook}
                          height={85}
                          width={100}
                          priority={true}
                          style={{ width: "auto", height: "auto" }}
                          alt={item.books[0].nameBook}
                        />
                        <h1 className="font-bold">{item.books[0].nameBook}</h1>
                      </div>
                    </td>
                    <td className="text-center">
                      {item.books[0].detailBook.price}$
                    </td>
                    <td className="justify-center">
                      <div className="flex justify-center">
                        <div className="relative flex items-center max-w-[8rem]">
                          <button
                            onClick={() =>
                              handleMinusQuantity(item.books[0].id, item.amount)
                            }
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="quantity-input"
                            className="bg-gray-300  hover:bg-gray-200 border border-black rounded-s-lg p-3 h-11 "
                          >
                            <svg
                              className="w-3 h-3  dark:text-black"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          {/* Quantity input */}
                          <input
                            value={item.amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            id="quantity-input"
                            data-input-counter
                            aria-describedby="helper-text-explanation"
                            className="no-spinner bg-gray-300 border border-black  text-black h-11 text-center  text-sm  block w-full py-2.5 "
                            placeholder="999"
                            required
                          />
                          <button
                            onClick={() =>
                              handlePlusQuantity(item.books[0].id, item.amount)
                            }
                            type="button"
                            className="bg-gray-300  hover:bg-gray-200 border border-black  rounded-e-lg p-3 h-11 "
                          >
                            <svg
                              className="w-3 h-3 text-black"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-bold text-red-500">
                      {item.books[0].detailBook.price * item.amount}$
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDeleteCart(item.id)}
                        className="hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="w-full flex justify-center">
              {Number(amoutItem) == 0 ? (
                <Image
                  src={"/images/empty-cart.png"}
                  width={400}
                  height={400}
                  alt="empty-cart"
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
              ) : null}
            </div>
          </div>
          <div className="basis-1/4 h-60 m-3 border border-black rounded-lg">
            <div className="flex flex-col m-2 divide-y-2">
              <h1 className="text-lg font-bold">CART TOALS</h1>
              <div className="flex flex-col ">
                <div className="flex flex-row mt-2">
                  <h1>Subtotal</h1>
                  <h1 className=" mr-4 text-red-500 font-bold text-lg ml-auto ">
                    {subtotal}$
                  </h1>
                </div>
                <div className="flex flex-row mt-5">
                  <h1>Shipping</h1>
                  <h1 className=" mr-4 ml-auto ">Free</h1>
                </div>
                <div className="flex flex-row mt-5">
                  <h1>Total</h1>
                  <h1 className=" mr-4 text-red-500 font-bold text-lg ml-auto ">
                    {subtotal}$
                  </h1>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => {
                    setIsloading(true);
                  }}
                  type="button"
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
                >
                  <div className="flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                      />
                    </svg>

                    <h1 className="ml-6">
                      {isloading ? "Loading..." : "Checkout"}
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
