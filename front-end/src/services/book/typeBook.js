import React from "react";
import axios from "axios";

export default async function StypeBook() {
  try {
    const response = await axios.get("http://localhost:3333/type-book");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function SgetTypeBookById(id) {
  try {
    const response = await axios.get("http://localhost:3333/type-book/" + id);

    return response.data;
  } catch (error) {
    return error;
  }
}
