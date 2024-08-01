"use client";
import React from "react";
import axios from "axios";
import { API_BOOKS } from "../API";
export default async function Sbook() {
  try {
    const response = await axios.get(API_BOOKS());

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function ScreateBook(formData) {
  try {
    const response = await axios.post(API_BOOKS()+
      "/create",
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
export async function SupdateBook(id, formData) {
  console.log("tuasdfasdf", id);
  try {
    const response = await axios.put(API_BOOKS()+
      "/update/" + id,
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
    const respones = await axios.get(API_BOOKS()+
      "/category/" + id
    );

    return respones.data;
  } catch (error) {}
}

export async function SgetBookById(id) {
  try {
    const respones = await axios.get(API_BOOKS()+"/" + id);
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
    const respones = await axios.get(API_BOOKS()+
      "/detail-book/" + id
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
    const response = await axios.get(API_BOOKS());
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
    const response = await axios.delete(API_BOOKS()+
      "/delete/" + id
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
