"use client";
import React from "react";
import Checkout from "@/components/Checkout";
import { getCartByIdCart } from "@/services/cart/cart";
import { useState, useEffect } from "react";
export default function page({ params }) {
  const [cart, setCart] = useState([]);

  useEffect(
    () => async () => {
      const data = {
        user_id: localStorage.getItem("idUser"),
        cart_id: params.id,
      };
      const respones = await getCartByIdCart(data);
      console.log(respones);
      setCart(respones);
    },
    []
  );
  return (
    <div>
      <Checkout data={cart} />
    </div>
  );
}
