import axios from "axios";
import React from "react";

export default async function ScategoryBook() {
  try {
    const response = await axios.get("http://localhost:3333/category-book");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
}
