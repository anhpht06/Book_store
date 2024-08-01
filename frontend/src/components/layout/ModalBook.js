"use client";
import React from "react";
import StypeBook from "@/services/book/typeBook";
import ScategoryBook, {
  SgetAllCategoryBook,
  SupdateBook,
} from "@/services/book/categoryBook";
import { ScreateBook } from "@/services/book/book";
import getAllauther from "@/services/book/auther";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalBook = ({ isOpen, onClose, onCloseSave }) => {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [category, setCategory] = useState([]);
  const [auther, setAuther] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  //data send sever
  const [idType, setIdType] = useState(0);
  const [idCategory, setIdCategory] = useState(0);
  const [idAuther, setIdAuther] = useState(0);
  const [nameBook, setNameBook] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");

  if (price < 0) {
    setPrice(0);
  }
  if (amount < 0) {
    setAmount(0);
  }
  useEffect(() => {
    setImageUrl(null);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const types = await StypeBook();
      setTypes(types.data);
      const auther = await getAllauther();
      setAuther(auther?.data);
      const category = await ScategoryBook(idType);
      setCategory(category?.data);
    };
    fetchData();
  }, [idType]);

  async function handleAddBook() {
    setLoading(true);
    const formData = new FormData();
    formData.append("image_book", image);

    formData.append("name_book", nameBook);
    formData.append("price", price);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("publisher", publisher);
    formData.append("type_book_id", idType);
    formData.append("category_id", idCategory);
    formData.append("auther_id", idAuther);

    const respones = await ScreateBook(formData);

    console.log("respones", respones);
    try {
      if (respones?.status === "200") {
        closeSave();
      } else {
        toast.error("Add fail");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImage(file);
      console.log(file);
    }
  };

  function closeSave() {
    onCloseSave();
    setIdType(0);
    setIdCategory(0);
    setIdAuther(0);
    setNameBook("");
    setImageUrl(null);
    setImage("");
    setPrice(0);
    setAmount(0);
    setDescription("");
    setPublisher("");
  }
  function close() {
    onClose();
    setIdType(0);
    setIdCategory(0);
    setIdAuther(0);
    setNameBook("");
    setImageUrl(null);
    setImage("");
    setPrice(0);
    setAmount(0);
    setDescription("");
    setPublisher("");
  }

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-black bg-white p-6 rounded-lg shadow-lg ">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-center">Add book</h1>
          {/* form */}
          <div className="flex space-x-4 mt-4 mb-4">
            <div className="flex flex-col space-y-4">
              {/* Drowpdown */}
              <div className="relative h-16 w-72 min-w-[200px] ">
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="peer h-full w-full rounded-lg border border-black border-t-transparent  px-3 py-2.5   font-normal    placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-white focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  <option value={0}>...</option>
                  {types?.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      onChange={(e) => setIdType(e.target.value)}
                    >
                      {item.nameType}
                    </option>
                  ))}
                </select>
                <label className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none  font-bold leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select type book
                </label>
              </div>

              <div className="relative h-16 w-72 min-w-[200px]">
                <select
                  value={idCategory}
                  onChange={(e) => setIdCategory(e.target.value)}
                  className="peer h-full w-full rounded-lg border border-black border-t-transparent  px-3 py-2.5   font-normal placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-white focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  <option value={0}>...</option>
                  {category?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nameCategory}
                    </option>
                  ))}
                </select>

                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none  font-bold leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select category book
                </label>
              </div>

              <div className="relative h-16 w-72 min-w-[200px]">
                <select
                  value={idAuther}
                  onChange={(e) => setIdAuther(e.target.value)}
                  className="peer h-full w-full rounded-lg border border-black border-t-transparent  px-3 py-2.5   font-normal    placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-white focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  <option value={0}>...</option>
                  {auther?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <label className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none  font-bold leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select auther
                </label>
              </div>

              <label className="border border-black px-2 py-2 rounded-lg">
                <h1 className="  font-bold mb-3">Name book</h1>
                <input
                  value={nameBook}
                  onChange={(e) => setNameBook(e.target.value)}
                  placeholder="Enter name book"
                  className="border-none outline-none text-xl"
                ></input>
              </label>
              <label className="border border-black px-2 py-2 rounded-lg">
                <h1 className="text-base font-bold mb-3">Description</h1>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter price"
                  className="border-none outline-none text-xl"
                ></input>
              </label>
            </div>

            {/*Them detail book */}
            <div className="flex flex-col space-y-4">
              <label className="flex flex-row border border-black  px-2 py-2 rounded-lg ">
                <div>
                  <h1 className="text-base font-bold mb-3">Image</h1>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="border-none outline-none text-xl items-center"
                  ></input>
                </div>
                <div>
                  {imageUrl && (
                    <Image
                      className=" rounded-lg "
                      src={imageUrl}
                      alt="Uploaded Image"
                      width={100}
                      height={100}
                      priority
                    />
                  )}
                </div>
              </label>

              <label className="border border-black px-2 py-2 rounded-lg">
                <h1 className="text-base font-bold mb-3">publisher</h1>
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="Enter price"
                  className="border-none outline-none text-xl"
                ></input>
              </label>

              <label className="border border-black px-2 py-2 rounded-lg">
                <h1 className="text-base font-bold mb-3">Price</h1>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="border-none outline-none text-xl"
                ></input>
              </label>

              <label className="border border-black px-2 py-2 rounded-lg">
                <h1 className="text-base font-bold mb-3">Total Amount</h1>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="border-none outline-none text-xl"
                ></input>
              </label>
            </div>
          </div>
          {/* button */}
          <div className="flex space-x-4">
            <button
              disabled={loading}
              onClick={handleAddBook}
              className="bg-green-500 px-3 py-3 rounded-lg font-bold hover:bg-green-400"
            >
              {loading ? "Loading..." : "Add book"}
            </button>
            <button
              onClick={close}
              className="bg-red-500 px-3 py-3 rounded-lg  font-bold hover:bg-red-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalBook;
