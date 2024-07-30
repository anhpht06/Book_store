"use client";
import React from "react";
import Checkout from "@/components/Checkout";
import { useState, useEffect } from "react";
import { getCartByIdUser } from "@/services/cart/cart";

export default function page() {
  const [cart, setCart] = useState([]);

  useEffect(
    () => async () => {
      const respones = await getCartByIdUser(localStorage.getItem("idUser"));
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
