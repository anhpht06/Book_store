import React from "react";
import axios from "axios";

export default function SLogin(data) {
  try {
    const response = axios.post("http://localhost:3333/user/login", data);
    return response;
  } catch (error) {
    console.log({ message: "can't get backEnd URL", error: error });
  }
}
