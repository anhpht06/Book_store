import React from "react";
import axios from "axios";
import { API_USER } from "../API";
export default async function Sprofile(id) {
  console.log(API_USER() + "/profile-user/" + id);
  try {
    const response = await axios.get(API_USER() + "/profile-user/" + id);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        status: "404",
        message: "User not found",
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function SUpdateProfile(id, data) {
  try {
    const response = await axios.put(API_USER() + "/profile-user/" + id, data);

    if (response.status === "200") {
      return response.data;
    } else {
      return {
        data: response.data,
      };
    }
  } catch (error) {
    console.log(error);
  }
}
export async function SgetAllProfile() {
  try {
    const response = await axios.get(API_USER());
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        status: "404",
        message: " not found",
      };
    }
  } catch (error) {
    console.log(error);
  }
}
export async function SdeleteUser(id) {
  try {
    const response = await axios.delete(API_USER() + "/delete/" + id);
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        status: "404",
        message: " not found",
      };
    }
  } catch (error) {
    console.log(error);
  }
}
