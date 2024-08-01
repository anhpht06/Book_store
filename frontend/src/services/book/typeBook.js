import React from "react";
import axios from "axios";
import { API_TYPEBOOK } from "../API";

export default async function StypeBook() {
  try {
    const response = await axios.get(API_TYPEBOOK());
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function SgetTypeBookById(id) {
  try {
    const response = await axios.get(API_TYPEBOOK()+"/" + id);

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function SdeleteTypeBook(id) {
  try {
    const response = await axios.delete(API_TYPEBOOK()+
      "/delete/" + id
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
export async function SupdateTypeBook(id, data) {
  try {
    const response = await axios.put(API_TYPEBOOK()+
      "/update/" + id,
      data
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
export async function ScreateTypeBook(data) {
  try {
    const response = await axios.post(API_TYPEBOOK()+
      "/create",
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
    const response = await axios.get(API_TYPEBOOK());
    return response.data;
  } catch (error) {
    return error;
  }
}
