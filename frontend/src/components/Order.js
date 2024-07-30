"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getOrderByUser } from "../services/order/order";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function Order() {
  const [order, setOrder] = useState([]);

  useEffect(
    () => async () => {
      const response = await getOrderByUser(localStorage.getItem("idUser"));
      if (response?.status === "404") {
        setOrder([]);
      } else {
        setOrder(response);
      }
    },
    []
  );
  return (
    <div>
      <div className="w-full h-full bg-gray-300 flex flex-col items-center">
        <div className="w-full h-28 bg-white flex flex-row shadow-md">
          <h1 className="text-2xl font-bold w-fit h-fit  mt-9 ml-40">
            My Purchase
          </h1>
        </div>

        <div className="mt-2 h-fit  w-4/5 flex flex-col ">
          <table className="table-fixed  ">
            <thead className="bg-white shadow-sm ">
              <tr className="flex flex-row m-4 ">
                <th className="text-start basis-3/4">Product</th>
                <th className="text-end basis-1/4">Price Product</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order?.map((items, index) => (
                  <tr
                    className="flex flex-row mt-4 bg-white rounded-sm shadow-lg"
                    key={items.id}
                  >
                    <div className="flex flex-col basis-full divide-y-2">
                      <td className="basis-full m-4 flex flex-col">
                        <div className="flex flex-col divide-y-2 divide-gray-300">
                          {items.books.map((book) => (
                            <div className="flex flex-row mb-4" key={book.id}>
                              <div className="flex flex-row basis-3/4">
                                <Image
                                  className="mt-4 rounded-lg"
                                  src={book?.image_book}
                                  width={50}
                                  height={50}
                                  priority={true}
                                  style={{ width: "auto", height: "auto" }}
                                  alt="book"
                                />
                                <div className="flex flex-col m-4">
                                  <h1 className="text-lg font-bold">
                                    {book.nameBook}
                                  </h1>
                                  <h1>{book.auther}</h1>
                                  <h1>x{book.amount}</h1>
                                </div>
                              </div>

                              <div className="basis-1/4 text-end mt-10 mr-4">
                                <h1 className="text-lg font-bold text-red-500 ">
                                  {book.price}$
                                </h1>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <div className="flex flex-row basis-full justify-end items-center mr-4 mb-4 ">
                        <h1 className=" text-sm mt-2">Order Total:</h1>
                        <h1 className="text-lg font-bold text-red-500 ml-2 mt-2">
                          {items.total_price}$
                        </h1>
                      </div>
                    </div>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
