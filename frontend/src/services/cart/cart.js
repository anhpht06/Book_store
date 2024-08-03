import React from "react";
import axios from "axios";
import { API_CART } from "../API";
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
export default async function cart() {
  const respones = await axios.get(API_CART());
  if (respones.data.status === "200") {
    return respones.data.data;
  } else if (respones.data.status === "404") {
    return respones.data;
  }
}
export async function createCart(data) {
  try {
    const respones = await axios.post(API_CART() + "/create", data);

    if (respones.data.status === "200") {
      return respones.data.data;
    } else if (respones.data.status === "404") {
      return respones.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getCartByIdBook(idUser, idBook) {
  const data = { user_id: idUser, book_id: idBook };

  const respones = await axios.post(API_CART() + "/book/", data);

  if (respones.data.status === "200") {
    return respones.data.data;
  } else if (respones.data.status === "404") {
    return respones.data;
  }
}
export async function getCartByIdUser(id) {
  const respones = await axios.get(API_CART() + "/" + id);
  if (respones.data.status === "200") {
    return respones.data.data;
  } else if (respones.data.status === "404") {
    return respones.data;
  }
}
export async function getCartByIdCart(data) {
  const respones = await axios.post(API_CART() + "/checkout/", data);
  if (respones.data.status === "200") {
    return respones.data.data;
  } else if (respones.data.status === "404") {
    return respones.data;
  }
}

export async function deleteCart(id) {
  const respones = await axios.delete(API_CART() + "/delete/" + id);
  if (respones.data.status === "200") {
    return respones.data.data;
  } else if (respones.data.status === "404") {
    return respones.data;
  }
}
export async function deleteCartWhenCheckout(data) {
  const respones = await axios.post(API_CART() + "/delete", data);
  if (respones.data.status === "200") {
    return respones.data;
  } else if (respones.data.status === "404") {
    return respones.data;
  }
}
export async function updateCart(data) {
  const respones = await axios.put(API_CART() + "/update", data);
  if (respones.status === 200) {
    return respones.data;
  }
}
