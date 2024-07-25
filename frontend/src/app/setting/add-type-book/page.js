"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBarSetting from "@/components/SideBarSetting";
import StypeBook, {
  SdeleteTypeBook,
  ScreateTypeBook,
  SupdateTypeBook,
} from "@/services/book/typeBook";
import { useState, useEffect } from "react";
import ModalTypeBook from "@/components/layout/Modal";

export default function page() {
  const [isCheckRefresh, setIsCheckRefresh] = useState(false);
  const [typeBook, setTypeBook] = useState([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModaOpenAadd, setIsModaOpenAadd] = useState(false);

  const [nameType, setnameType] = useState("");
  const [id, setId] = useState(0);

  function toastify(messages, boolen) {
    if (boolen) {
      toast.success(messages);
    } else {
      toast.error(messages);
    }
  }

  useEffect(
    () => async () => {
      const respones = await StypeBook();
      setTypeBook(respones.data);
    },
    [isCheckRefresh]
  );

  async function handleDelete(id) {
    if (confirm("Bạn có muốn xóa không?")) {
      const respones = await SdeleteTypeBook(id);
      if (respones?.status === "200") {
        window.location.reload();
      }
    }
  }

  const openModalAddType = () => {
    setIsModaOpenAadd(true);
    setnameType("");
  };
  const openModalEditType = (nameType, id) => {
    setIsModalOpenEdit(true);
    setnameType(nameType);
    setId(id);
  };

  const closeModal = () => {
    setIsModalOpenEdit(false);
    setIsModaOpenAadd(false);
  };

  const handleSaveEditt = async () => {
    const data = {
      name_type: nameType,
    };
    const respones = await SupdateTypeBook(id, data);

    if (respones?.status === "200") {
      setIsCheckRefresh(!isCheckRefresh);
      setIsModalOpenEdit(false);
      toast("Update success");
      document.location.reload();
    } else {
      toast("Update fail");
      setIsModalOpenEdit(false);
    }
  };
  async function handleSaveAdd() {
    const data = {
      name_type: nameType,
    };

    const respones = await ScreateTypeBook(data);
    if (respones?.status === "200") {
      toastify("Add success", true);
      setIsModaOpenAadd(false);
      // setIsCheckRefresh(!isCheckRefresh);
      window.location.reload();
    } else {
      toastify("Add fail", false);
      setIsModaOpenAadd(false);
    }
  }
  return (
    <div className="flex flex-row">
      <SideBarSetting />

      <div className="m-3 rounded-lg text-white w-full bg-gray-800 ">
        <div className="m-6 flex flex-col divide-y divide-gray-500">
          <div className="flex flex-row">
            <h1 className="text-xl font-bold ">Danh sách type book</h1>
            <button
              onClick={openModalAddType}
              className="ml-auto mr-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              Add type book
            </button>
          </div>
          <div className="mt-2">
            <table className="table-auto w-full mt-4  ">
              <thead>
                <tr className="">
                  <th className="text-center">STT</th>
                  <th className="text-left">Type book</th>
                  <th className="text-center">Chọn</th>
                </tr>
              </thead>
              <tbody className="text-left ">
                {typeBook
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="border ">
                      <td className="text-center">{index + 1}</td>
                      <td>{item.nameType}</td>
                      <td>
                        <div className="flex space-x-4 items-center justify-center  m-4">
                          <button
                            onClick={() =>
                              openModalEditType(item.nameType, item.id)
                            }
                            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* open dialog edit */}
            <ModalTypeBook isOpen={isModalOpenEdit} onClose={closeModal}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black mb-4">
                  Edit type book
                </h1>
                <div className="flex flex-row bg-gray-300">
                  <label className="text-black text-sm  ">Name type book</label>
                </div>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded text-black"
                  type="text"
                  value={nameType}
                  onChange={(e) => setnameType(e.target.value)}
                ></input>

                <div className="flex space-x-4 mt-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700  basis-1/2 "
                    onClick={handleSaveEditt}
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
            </ModalTypeBook>

            {/* open dialog add */}
            <ModalTypeBook isOpen={isModaOpenAadd} onClose={closeModal}>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black mb-4">
                  Add type book
                </h1>
                <div className="flex flex-row bg-gray-300">
                  <label className="text-black text-sm  ">Name type book</label>
                </div>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded text-black"
                  type="text"
                  value={nameType}
                  onChange={(e) => setnameType(e.target.value)}
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
                    onClick={closeModal}
                  >
                    cancel  
                  </button>
                </div>
              </div>
            </ModalTypeBook>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
