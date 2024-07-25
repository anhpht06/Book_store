"use client";
import React from "react";
import SideBarSetting from "@/components/SideBarSetting";
import getAllauther, {
  ScreateAuther,
  SdeleteAuther,
  SupdateAuther,
} from "@/services/book/auther";
import { useState, useEffect } from "react";
import ModalAuther from "@/components/layout/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function page() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [auther, setAuther] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEidt, setIsOpenEidt] = useState(false);
  const [nameAuther, setNameAuther] = useState("");
  const [id, setId] = useState(NaN);

  useEffect(
    () => async () => {
      const respones = await getAllauther();

      setAuther(respones?.data);
    },
    [isRefresh]
  );

  function toastify(messages, boolen) {
    if (boolen) {
      toast.success(messages);
    } else {
      toast.error(messages);
    }
  }
  function openAuther() {
    setIsOpen(true);
    setNameAuther("");
  }
  function openEdit(name, id) {
    setIsOpenEidt(true);
    setNameAuther(name);
    setId(id);
  }
  function closeAuther() {
    setIsOpen(false);
    setIsOpenEidt(false);
  }
  async function handleSaveAdd() {
    const data = {
      name: nameAuther,
    };
    const respones = await ScreateAuther(data);
    if (respones?.status === "200") {
      toastify("Add success", true);
      setIsOpen(false);
      setIsRefresh(!isRefresh);
    } else {
      toastify("Add fail", false);
      setIsOpen(false);
    }
  }
  async function handleSaveEdit() {
    const data = {
      name: nameAuther,
    };
    const respones = await SupdateAuther(id, data);
    if (respones?.status === "200") {
      toastify("Update success", true);
      setIsOpenEidt(false);
      setIsRefresh(!isRefresh);
    } else {
      toastify("Update fail", false);
      setIsOpenEidt(false);
    }
  }
  async function handleDelete(id, name) {
    if (confirm("Bạn có muốn xóa không?")) {
      const respones = await SdeleteAuther(id);
      if (respones?.status === "200") {
        toastify(`Delete ${name} success`, true);
        setIsRefresh(!isRefresh);
      } else {
        toastify("Delete fail", false);
      }
    }
  }
  return (
    <div className="flex flex-row">
      <SideBarSetting />

      <div className="m-3 rounded-lg text-white w-full bg-gray-800 ">
        <div className="m-6 flex flex-col divide-y divide-gray-500">
          <div className="flex flex-row">
            <h1 className="text-xl font-bold ">Danh sách auther</h1>
            <button
              onClick={openAuther}
              className="ml-auto mr-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              Add auther
            </button>
          </div>
          <div className="mt-2">
            <table className="table-fixed w-full mt-4">
              <thead className="">
                <tr className="text-xl font-bold">
                  <th className="text-center ">STT</th>

                  <th className="text-left "> Name auther</th>
                  <th className="text-center">Chọn</th>
                </tr>
              </thead>
              <tbody className="text-left px-4 py-6">
                {auther
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="border ">
                      <td className="text-center">{index + 1}</td>
                      <td>{item?.name}</td>

                      <td className="text-center">
                        <div className="flex space-x-4 items-center justify-center  m-4">
                          <button
                            onClick={() => openEdit(item.name, item.id)}
                            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id, item.name)}
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
            <ModalAuther isOpen={isOpenEidt} onClose={closeAuther}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black mb-4">
                  Edit auther
                </h1>
                <div className="flex flex-row bg-gray-300">
                  <label className="text-black text-sm  ">Name auther</label>
                </div>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded text-black"
                  type="text"
                  value={nameAuther}
                  onChange={(e) => setNameAuther(e.target.value)}
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
                    onClick={closeAuther}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </ModalAuther>
            {/* open dialog  add */}

            <ModalAuther isOpen={isOpen} onClose={closeAuther}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black mb-4">
                  Add auther
                </h1>
                <div className="flex flex-row bg-gray-300">
                  <label className="text-black text-sm  ">Name auther</label>
                </div>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded text-black"
                  type="text"
                  value={nameAuther}
                  onChange={(e) => setNameAuther(e.target.value)}
                ></input>

                <div className="flex space-x-4 mt-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700  basis-1/2 "
                    onClick={handleSaveAdd}
                  >
                    save
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700  basis-1/2 "
                    onClick={closeAuther}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </ModalAuther>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
