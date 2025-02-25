"use client";
import React from "react";
import Sprofile, { SUpdateProfile } from "@/services/auth/profile";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Profile({ id }) {
  const [profile, setProfile] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [error, setError] = useState("");

  const notifySuccess = () => {
    toast.success("Cập nhật thành công");
  };

  const notifyError = () => {
    toast.error("Cập nhật thất bại");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Sprofile(id);

      setProfile(response.data);
      setUserName(response.data.userName);
      setPhone(response.data.phone);
      setAge(response.data.age);
      setgender(response.data.gender);
      setaddress(response.data.address);
    };
    fetchData();
  }, [isUpdate]);

  async function handleUpdateProfile() {
    const data = {
      user_name: userName,
      phone: phone,
      age: age,
      gender: gender,
      address: address,
    };

    const response = await SUpdateProfile(id, data);
    console.log(response.data);
    if (response.data.status === "200") {
      console.log("thanh cong");
      setProfile(response.data);
      setIsUpdate(!isUpdate);
      notifySuccess();
      setError("");
    } else if (response.data.status === "404") {
      console.log("that bai");
      notifyError();
      setError("Số điện thoại đã được đăng ký!");
    }
  }
  async function handleCancelUpdateProfile(event) {
    event.preventDefault();

    setUserName(profile.userName);
    setPhone(profile.phone);
    setAge(profile.age);
    setgender(profile.gender);
    setaddress(profile.address);
  }
  return (
    <div className=" h-full w-full m-6 ml-16 ">
      <div className="flex flex-row  divide-x divide-gray-500   ">
        <div className="flex flex-row basic-1/3 mr-6">
          <div className="flex flex-row ">
            <h1 className="text-xl font-bold mt-6">{profile?.userName}</h1>
            <div>
              <Image
                className="ml-10"
                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                alt="Picture of the author"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col  ml-6 ">
            <h1 className="text-xl font-bold">Quản lý thông tin</h1>
            <h1 className=" text-sm font-bold mt-2">Thông tin cá nhân</h1>
            <div className="flex flex-col divide-y divide-gray-500 ">
              <div>
                <form className="flex flex-col mt-2 mb-2">
                  <div className="flex flex-col border-2 border-black rounded-lg  p-1.5 mt-2">
                    <label className="text-xs text-gray-500">Email</label>

                    <label>{profile?.user?.email}</label>
                  </div>

                  <div className="flex flex-col border-2 border-black rounded-lg  p-1.5 mt-2">
                    <label className="text-xs text-gray-500">Name</label>

                    <input
                      type="text"
                      id="name"
                      value={userName || ""}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col border-2 border-black rounded-lg  p-1.5 mt-2">
                    <label className="text-xs text-gray-500">Phone</label>

                    <input
                      type="text"
                      id="phone"
                      value={phone || ""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <h1 className="text-red-500 text-sm">{error}</h1>
                  </div>

                  <div className="flex flex-col border-2 border-black rounded-lg  p-1.5 mt-2">
                    <label className="text-xs text-gray-500">age</label>

                    <input
                      type="text"
                      id="age"
                      value={age || ""}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col border-2 border-black rounded-lg  p-1.5 mt-2">
                    <label className="text-xs text-gray-500">gender</label>

                    <input
                      type="text"
                      id="gender"
                      value={gender || ""}
                      onChange={(e) => setgender(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col border-2 border-black rounded-lg  p-1.5 mt-2">
                    <label className="text-xs text-gray-500">address</label>

                    <input
                      type="text"
                      id="address"
                      value={address || ""}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-row">
                    <button
                      type="button"
                      onClick={() => handleUpdateProfile()}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelUpdateProfile}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-10"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
