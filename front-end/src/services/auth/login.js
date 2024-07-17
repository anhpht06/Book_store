import React from "react";
import axios from "axios";
export default async function Slogin(email, password) {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post("http://localhost:3333/user/login", data);
    return response.data;
  } catch (error) {
    return error;
  }
}
