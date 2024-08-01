"use client";
import React from "react";
import Checkout from "@/components/Checkout";
import { getCartByIdCart } from "@/services/cart/cart";
import { useState, useEffect } from "react";
export default function page({ params }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("idUser");
      const idCart = params.id;

      const data = {
        user_id: idUser,
        cart_id: idCart,
      };
      const respones = await getCartByIdCart(data);
      setCart(respones);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Checkout data={cart} />
    </div>
  );
}
