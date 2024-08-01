"use client";
import React from "react";
import SideBarSetting from "@/components/SideBarSetting";
import { useState, useEffect } from "react";
import {
  SgetAllCategoryBook,
  SdeleteCategoryBook,
  SupdateTypeBook,
  ScreateCategoryBook,
} from "@/services/book/categoryBook";
import { SgetAllTypeBook } from "@/services/book/typeBook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCategoryBook from "@/components/layout/Modal";
import DropdownTypeBook from "@/components/layout/DropdownTypeBook";
export default function page() {
  const [isCheck, setIsCheck] = useState(false);

  const [categoryBook, setCategoryBook] = useState([]);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

  const [typeBook, setTypeBook] = useState([]);
  const [id, setId] = useState(0);

  const [idNameType, setIdNameType] = useState(NaN);
  const [nameCategory, setnameCategory] = useState("");

  function toastify(messages, boolen) {
    if (boolen) {
      toast.success(messages);
    } else {
      toast.error(messages);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const respones = await SgetAllCategoryBook();
      setCategoryBook(respones?.data);

      const responesTypeBook = await SgetAllTypeBook();
      setTypeBook(responesTypeBook?.data);
    };

    fetchData();
  }, [isCheck]);

  function openModalAddCategory() {
    setIsOpenModalAdd(true);
    setnameCategory("");
  }

  function openModalEditCategory(id, nameCategory) {
    setIsOpenModalEdit(true);
    setnameCategory(nameCategory);
    setId(id);
  }
  function closeModal() {
    setIsOpenModalEdit(false);
    setIsOpenModalAdd(false);
  }

  async function handleDelete(id) {
    if (confirm("Bạn có muốn xóa không?")) {
      const respones = await SdeleteCategoryBook(id);
      if (respones?.status === "200") {
        toastify("Delete success", true);
        setIsCheck(!isCheck);
      } else {
        toastify("Delete fail", false);
      }
    }
  }
  async function handleSaveEdit() {
    const data = {
      name_category: nameCategory,
    };
    const respones = await SupdateTypeBook(id, data);
    if (respones?.status === "200") {
      toastify("Update success", true);
      setIsCheck(!isCheck);
      setIsOpenModalEdit(false);
    } else {
      toastify("Update fail", false);
      setIsOpenModalEdit(false);
    }
  }

  async function handleSaveAdd() {
    const data = {
      type_book_id: idNameType,
      name_category: nameCategory,
    };
    const respones = await ScreateCategoryBook(data);
    console.log(respones);
    if (respones?.status === "200") {
      toastify("Add success", true);
      setIsCheck(!isCheck);
      setIsOpenModalAdd(false);
    } else {
      toastify("Add fail", false);
      setIsOpenModalAdd(false);
    }
  }

  return (
    <div className="flex flex-row">
      <SideBarSetting />
      <div className="m-3 rounded-lg text-white w-full bg-gray-800 ">
        <div className="m-6 flex flex-col divide-y divide-gray-500">
          <div className="flex flex-row">
            <h1 className="text-xl font-bold ">Danh sách category book</h1>
            <button
              onClick={openModalAddCategory}
              className="ml-auto mr-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              Add category book
            </button>
          </div>
          <div className="mt-2">
            <table className="table-fixed w-full mt-4">
              <thead className="">
                <tr className="text-xl font-bold">
                  <th className="text-center ">STT</th>
                  <th className="text-left ">Name type book</th>
                  <th className="text-left "> Name category</th>
                  <th className="text-center">Chọn</th>
                </tr>
              </thead>
              <tbody className="text-left px-4 py-6">
                {categoryBook
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="border ">
                      <td className="text-center">{index + 1}</td>
                      <td>{item && item?.typeBook?.nameType}</td>
                      <td>{item?.nameCategory}</td>
                      <td className="text-center">
                        <div className="flex space-x-4 items-center justify-center  m-4">
                          <button
                            onClick={() =>
                              openModalEditCategory(
                                item?.id,
                                item?.nameCategory
                              )
                            }
                            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item?.id)}
                            className="bg-red-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            delete
                          </button>
                        </div>
                        <h1></h1>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* open dialog edit */}

            <ModalCategoryBook isOpen={isOpenModalEdit} onClose={closeModal}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black mb-4">
                  Edit category book
                </h1>
                <div className="flex flex-row bg-gray-300">
                  <label className="text-black text-sm  ">
                    Name category book
                  </label>
                </div>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded text-black"
                  type="text"
                  value={nameCategory}
                  onChange={(e) => setnameCategory(e.target.value)}
                ></input>

                <div className="flex space-x-4 mt-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700  basis-1/2 "
                    onClick={handleSaveEdit}
                  >
                    save
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700  basis-1/2 "
                    onClick={closeModal}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </ModalCategoryBook>

            {/* open dialog  add */}

            <ModalCategoryBook isOpen={isOpenModalAdd} onClose={closeModal}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black mb-4">
                  Add category book
                </h1>

                <div className="flex flex-col bg-gray-300">
                  <div
                    className="flex flex-row text-black text-sm  items-center mb-2
                  "
                  >
                    <label className="mr-2">Name type book: </label>

                    <DropdownTypeBook
                      setIdTypeBook={setIdNameType}
                      typeBook={typeBook}
                    />
                  </div>

                  <label className="text-black text-sm  ">
                    Name category book
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 p-2 rounded text-black"
                    type="text"
                    value={nameCategory}
                    onChange={(e) => setnameCategory(e.target.value)}
                  ></input>
                </div>

                <div className="flex space-x-4 mt-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700  basis-1/2 "
                    onClick={handleSaveAdd}
                  >
                    save
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700  basis-1/2 "
                    onClick={closeModal}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </ModalCategoryBook>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
