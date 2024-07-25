import React from "react";
import axios from "axios";
export default async function getAllauther() {
  const respones = await axios.get("http://localhost:3333/auther");
  return respones.data;
}

export async function ScreateAuther(data) {
  const respones = await axios.post(
    "http://localhost:3333/auther/create",
    data
  );
  return respones.data;
}
export async function SdeleteAuther(id) {
  const respones = await axios.delete(
    "http://localhost:3333/auther/delete/" + id
  );
  return respones.data;
}
export async function SupdateAuther(id, data) {
  const respones = await axios.put(
    "http://localhost:3333/auther/update/" + id,
    data
  );
  return respones.data;
}
