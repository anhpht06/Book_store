"use client";
import React from "react";
import Checkout from "@/components/Checkout";
import { useState, useEffect } from "react";
import { getCartByIdUser } from "@/services/cart/cart";

export default function page() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("idUser");
      const respones = await getCartByIdUser(idUser);
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
