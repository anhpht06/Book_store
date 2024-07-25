"use client";
import React from "react";
import SideBarSetting from "@/components/SideBarSetting";
import { useState, useEffect } from "react";
import { SgetAllBook, SdeleteBook } from "@/services/book/book";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import ModalBook from "@/components/layout/ModalBook";

export default function page() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [books, setBooks] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(
    () => async () => {
      const respones = await SgetAllBook();
      setBooks(respones.data);
    },
    [isRefresh]
  );

  function openAdd() {
    setIsOpenAdd(true);
  }
  function openEdit(id) {
    setIsOpenEdit(true);
  }
  function closeSave() {
    setIsOpenAdd(false);
    setIsRefresh(!isRefresh);
  }
  function close() {
    setIsOpenAdd(false);
  }
  async function handleDelete(id) {
    if (confirm("Bạn có muốn xóa không?")) {
      const respones = await SdeleteBook(id);

      if (respones?.status === "200") {
        toast.success("Delete success");
        setIsRefresh(!isRefresh);
      } else {
        toast.error("Delete fail");
      }
    }
  }
  return (
    <div className="flex flex-row">
      <SideBarSetting className="w-1/3" />

      <div className="m-3 rounded-lg text-white w-full bg-gray-800 ">
        <div className="m-6 flex flex-col divide-y divide-gray-500">
          <div className="flex flex-row">
            <h1 className="text-xl font-bold ">Danh sách book</h1>

            <button
              onClick={openAdd}
              className="ml-auto mr-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              Add book
            </button>
            <ModalBook
              isOpen={isOpenAdd}
              onClose={close}
              onCloseSave={closeSave}
            />
          </div>
          <div className="mt-2">
            <table className="table-fixed w-full mt-4">
              <thead className="">
                <tr className="text-xl font-bold">
                  <th className="text-center ">STT</th>
                  <th className="text-left "> Type book</th>
                  <th className="text-left "> Category book</th>
                  <th className="text-left "> image book</th>
                  <th className="text-left "> Name book</th>
                  <th className="text-left "> Auther</th>
                  <th className="text-left "> Price</th>
                  <th className="text-center">Total amount</th>
                  <th className="text-center">Chọn</th>
                </tr>
              </thead>
              <tbody className="text-left px-4 py-10">
                {books
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="border ">
                      <td className="text-center">{index + 1}</td>
                      <td>{item?.typeBook?.nameType || "NaN"}</td>
                      <td>{item?.catetoryBook?.nameCategory || "NaN"}</td>
                      <td className="">
                        <Image
                          className="rounded-lg "
                          src={item?.imageBook}
                          alt="image"
                          width={100}
                          height={100}
                        />
                      </td>
                      <td className="whitespace-normal">
                        <h1>{item?.nameBook || "NaN"}</h1>
                      </td>
                      <td>{item?.auther?.name || "NaN"}</td>
                      <td>{item?.detailBook?.price || "NaN"}</td>
                      <td className="text-center">
                        {item?.detailBook?.amount || "NaN"}
                      </td>

                      <td className="text-center">
                        <div className="flex space-x-4 items-center justify-center  m-4">
                          <button
                            // onClick={() =>
                            //   handleDelete(item.id, item?.user?.email)
                            // }
                            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Delete
                          </button>
                        </div>
                        <h1></h1>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* open dialog edit */}

            {/* open dialog  add */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
