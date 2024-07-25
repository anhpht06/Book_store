"use client";
import React from "react";
import SideBarSetting from "@/components/SideBarSetting";
import { SgetAllProfile,SdeleteUser } from "@/services/auth/profile";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [profile, setProfile] = useState([]);

  function toastify(message, bolean) {
    if (bolean) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }
  useEffect(
    () => async () => {
      const respones = await SgetAllProfile();
      setProfile(respones.data);
    },
    [isRefresh]
  );

  async function handleDelete(id, email) {
    if (confirm("Bạn có muốn xóa không?")) {
      const respones = await SdeleteUser(id);
      
      if (respones?.status === "200") {
        setIsRefresh(!isRefresh);
        toastify(`Delete ${email} success`, true);
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
            <h1 className="text-xl font-bold ">Danh sách user</h1>
          </div>
          <div className="mt-2">
            <table className="table-fixed w-full mt-4">
              <thead className="">
                <tr className="text-xl font-bold">
                  <th className="text-center ">STT</th>
                  <th className="text-left "> role</th>
                  <th className="text-left "> Name</th>
                  <th className="text-left "> Email</th>
                  <th className="text-left "> phone</th>
                  <th className="text-left "> gender</th>
                  <th className="text-left "> address</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="text-left px-4 py-6">
                {profile
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="border ">
                      <td className="text-center">{index + 1}</td>
                      <td>{item?.user?.role}</td>
                      <td>{item?.userName}</td>
                      <td>{item?.user?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.gender}</td>
                      <td>{item?.address}</td>

                      <td className="text-center">
                        <div className="flex space-x-4 items-center justify-center  m-4">
                          <button
                            onClick={() =>
                              handleDelete(item.id, item?.user?.email)
                            }
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

            {/* open dialog  add */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
