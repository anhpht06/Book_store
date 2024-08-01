import React from "react";
import axios from "axios";
import { API_AUTHER } from "../API";
export default async function getAllauther() {
  console.log("HTTP: test: " + API_AUTHER());
  const respones = await axios.get(API_AUTHER());
  return respones.data;
}

export async function ScreateAuther(data) {
  const respones = await axios.post(API_AUTHER() + "/create", data);
  return respones.data;
}
export async function SdeleteAuther(id) {
  const respones = await axios.delete(API_AUTHER() + "/delete/" + id);
  return respones.data;
}
export async function SupdateAuther(id, data) {
  const respones = await axios.put(API_AUTHER() + "/update/" + id, data);
  return respones.data;
}
