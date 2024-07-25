import React from "react";
import axios from "axios";
import { FaAws } from "react-icons/fa";

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

export async function SdeleteTypeBook(id) {
  try {
    const response = await axios.delete(
      "http://localhost:3333/type-book/delete/" + id
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
export async function SupdateTypeBook(id, data) {
  try {
    const response = await axios.put(
      "http://localhost:3333/type-book/update/" + id,
      data
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
export async function ScreateTypeBook(data) {
  try {
    const response = await axios.post(
      "http://localhost:3333/type-book/create",
      data
    );
    console.log(response.data);
    if (response.data.status === "200") {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}
export async function SgetAllTypeBook() {
  try {
    const response = await axios.get("http://localhost:3333/type-book");
    return response.data;
  } catch (error) {
    return error;
  }
}
