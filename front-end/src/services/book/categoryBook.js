import axios from "axios";
import React from "react";

export default async function ScategoryBook(id) {
  try {
    const response = await axios.get(
      "http://localhost:3333/category-book/" + id
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
