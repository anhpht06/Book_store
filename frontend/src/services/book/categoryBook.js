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

export async function SgetAllCategoryBook() {
  try {
    const response = await axios.get("http://localhost:3333/category-book");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function SdeleteCategoryBook(id) {
  try {
    const response = await axios.delete(
      "http://localhost:3333/category-book/delete/" + id
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function SupdateTypeBook(id, data) {
  try {
    const response = await axios.put(
      "http://localhost:3333/category-book/update/" + id,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function ScreateCategoryBook(data) {
  try {
    const response = await axios.post(
      "http://localhost:3333/category-book/create",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
