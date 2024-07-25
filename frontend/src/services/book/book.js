"use client";
import React from "react";
import axios from "axios";
export default async function Sbook() {
  try {
    const response = await axios.get("http://localhost:3333/books/");

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function ScreateBook(formData) {
  try {
    const response = await axios.post(
      "http://localhost:3333/books/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
export async function SgetBookByIdCate(id) {
  try {
    const respones = await axios.get(
      "http://localhost:3333/books/category/" + id
    );

    return respones.data;
  } catch (error) {}
}

export async function SgetBookById(id) {
  try {
    const respones = await axios.get("http://localhost:3333/books/" + id);
    if (respones.status === 200) {
      return respones.data;
    } else if (respones.status === 404) {
      return respones.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function SgetDetailBook(id) {
  try {
    const respones = await axios.get(
      "http://localhost:3333/books/detail-book/" + id
    );
    console.log(id);
    if (respones.status === 200) {
      return respones.data;
    } else if (respones.status === 404) {
      return respones.data;
    }
  } catch (error) {
    console.log("error:::", error.response.status);
  }
}

export async function SgetAllBook() {
  try {
    const response = await axios.get("http://localhost:3333/books/");
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}
export async function SdeleteBook(id) {
  try {
    const response = await axios.delete(
      "http://localhost:3333/books/delete/" + id
    );

    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}
