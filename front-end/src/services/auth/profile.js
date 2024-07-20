import React from "react";
import axios from "axios";
export default async function Sprofile(id) {
  try {
    const response = await axios.get(
      "http://localhost:3333/user/profile-user/" + id
    );

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
    const response = await axios.put(
      "http://localhost:3333/user/profile-user/" + id,
      data
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return {
        status: "404",
        message: "update fail",
      };
    }
  } catch (error) {
    console.log(error);
  }
}
