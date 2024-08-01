import React from "react";
import axios from "axios";
import { API_USER } from "../API";
export default function register() {}
export async function Sregister(data) {
  const respones = await axios.post(API_USER() +
    "/register",
    data
  );
  if (respones) {
    return respones.data;
  } else {
    return JSON.stringify({
      status: "404",
      message: "Email đã tồn tại",
    });
  }
}
