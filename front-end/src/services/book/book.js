import React from "react";
import axios from "axios";
export default async function Sbook() {
  try {
    const response = await axios.get("http://localhost:3333/books/");
    // console.log(response.data);
    return response.data
  } catch (error) {
    return error;
  }
}
