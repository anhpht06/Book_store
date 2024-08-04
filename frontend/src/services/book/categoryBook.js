import axios from "axios";
import React from "react";
import { API_CATEGORYBOOK } from "../API";
export default async function ScategoryBook(id) {
  if (id === "undefined") return;
  try {
    const response = await axios.get(API_CATEGORYBOOK() + "/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function SgetAllCategoryBook() {
  try {
    const response = await axios.get(API_CATEGORYBOOK());
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function SdeleteCategoryBook(id) {
  if (id === undefined) return;
  try {
    const response = await axios.delete(API_CATEGORYBOOK() + "/delete/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function SupdateTypeBook(id, data) {
  try {
    const response = await axios.put(
      API_CATEGORYBOOK() + "/update/" + id,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function ScreateCategoryBook(data) {
  try {
    console.log(API_CATEGORYBOOK() + "/create", data);
    const response = await axios.post(API_CATEGORYBOOK() + "/create", data);

    return response.data;
  } catch (error) {
    return error;
  }
}
