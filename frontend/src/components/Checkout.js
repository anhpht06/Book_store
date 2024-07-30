"use client";
import React from "react";
import { useState, useEffect } from "react";
import Sprofile from "@/services/auth/profile";
import cart, { deleteCartWhenCheckout } from "@/services/cart/cart";
import { createOrder } from "@/services/order/order";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function checkout({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [carts, setCarts] = useState([]);
  const [amoutItem, setAmoutItem] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [cart_ids, setCart_ids] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(
    () => async () => {
      const response = await Sprofile(localStorage.getItem("idUser"));
      setProfile(response?.data);
    },
    [isRefresh]
  );

  useEffect(() => {
    // setCarts([...data]);

    if (Array.isArray(data) && data.length > 0) {
      setCarts(data);
      setAmoutItem(Object.keys(data).length);
    }

    let newSubtotal = subtotal;
    let cart_ids = [];

    if (Array.isArray(data) && data.length > 0) {
      data?.forEach((item) => {
        newSubtotal += item.books[0].detailBook.price * item.amount;
        cart_ids.push(item.id);
      });
    }

    setCart_ids(cart_ids);
    setSubtotal(newSubtotal);
  }, [data, isRefresh]);

  async function handleCheckout() {
    setIsLoading(true);
    if (
      profile.userName == null ||
      profile.phone == null ||
      profile.address == null
    ) {
      alert("Please fill in your information");
      setIsLoading(false);
    } else {
      if (confirm("Do you want to Place Order?")) {
        setIsLoading(false);

        const data = {
          user_id: localStorage.getItem("idUser"),
          name_user: profile.userName,
          address: profile.address,
          phone: profile.phone,
          total_quantity: amoutItem,
          total_price: subtotal,
          cart_ids: cart_ids,
        };

        console.log("data", data);

        const response = await createOrder(data);
        console.log("Order: ", response);

        if (response.status === "200") {
          const data = {
            cart_ids: cart_ids,
          };
          const res = await deleteCartWhenCheckout(data);
          if (res.status === "200") {
            toast.success("Place order success");
            window.location.href = "/";
          }
        }
      } else {
        setIsLoading(false);
      }
    }
  }
  return (
    <div className="w-full h-screen bg-gray-300 flex flex-col items-center">
      <div className="w-full h-28 bg-white flex flex-row shadow-md">
        <h1 className="text-2xl font-bold w-fit h-fit  mt-9 ml-40">Checkout</h1>
      </div>
      <div className="mt-2 h-28 bg-white w-4/5 flex flex-col shadow-md ">
        <div className="flex flex-row m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="ml-2 text-lg">Delivery address</h1>
        </div>
        <div className="flex flex-row">
          <h1 className="ml-2 text-black font-bold">
            {profile.userName ? profile.userName : "Name null"}
          </h1>
          <h1 className="ml-2 text-black font-bold">
            {profile.phone ? profile.phone : "Phone null"}
          </h1>
          <h1 className=" ml-5">
            {profile.address ? profile.address : "address null"}
          </h1>
        </div>
      </div>

      <div className="mt-2 h-fit bg-white w-4/5 flex flex-col shadow-md">
        <table className="table-auto m-6">
          <thead>
            <tr>
              <th className="text-start">Products Ordered</th>
              <th className="">Unit Price</th>
              <th className="">Amount</th>
              <th className="">Item Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carts &&
              carts?.map((items, index) => (
                <tr key={items.id}>
                  <td>
                    <div className="flex gap-4  py-2">
                      <div className="base-1/2">
                        <Image
                          className="rounded-lg"
                          src={items.books[0].imageBook}
                          height={40}
                          width={40}
                          priority={true}
                          style={{ width: "auto", height: "auto" }}
                          alt={items.books[0].nameBook}
                        />
                      </div>
                      <div className=" basis-1/2 flex flex-col">
                        <h1 className="font-bold">{items.books[0].nameBook}</h1>
                        <h1>{items.books[0].auther.name}</h1>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    {items.books[0].detailBook.price}$
                  </td>
                  <td className="text-center">{items.amount}</td>

                  <td className="text-center text-red-500 font-bold ">
                    {items.books[0].detailBook.price * items.amount}$
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className=" mt-0.5 h-fit bg-white w-4/5 flex flex-row shadow-md">
        <div className="basis-3/4">
          <button
            onClick={() => handleCheckout()}
            className="  m-6 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            {isLoading ? "Loading..." : "Place Order"}
          </button>
        </div>
        <div className="flex gap-6  items-center justify-center basis-1/4 ">
          <h1>
            Order Total (<span className="text-red-500">{amoutItem} </span>
            Items)
          </h1>
          <h1 className="text-red-500 font-bold text-xl">{subtotal}$</h1>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
