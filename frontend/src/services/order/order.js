import React from "react";
import axios from "axios";
export default function order() {}
export async function createOrder(data) {
  try {
    const respones = await axios.post(
      "http://localhost:3333/order/create",
      data
    );

    if (respones.data.status === "200") {
      return respones.data;
    } else if (respones.data.status === "500") {
      return respones.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderByUser(user_id) {
  try {
    const respones = await axios.get("http://localhost:3333/order/" + user_id);
    if (respones.data.status === "200") {
      return respones.data.data;
    } else if (respones.data.status === "404") {
      return respones.data;
    }
  } catch (error) {
    console.log(error);
  }
}
