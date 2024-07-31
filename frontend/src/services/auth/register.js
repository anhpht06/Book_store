import React from "react";
import axios from "axios";
export default function register() {}
export async function Sregister(data) {
  const respones = await axios.post(
    "http://localhost:3333/user/register",
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
