import React from "react";
import axios from "axios";
export default async function Slogin(email, password) {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post("http://localhost:3333/user/login", data);
    console.log(response.data);
    if (response.data.status === "SUCCESS") {
      const resProfile = await axios.get("http://localhost:3333/user/login/" + email);
      console.log("Login success:")
      return {
        data: response.data.data,
        profile: resProfile.data};
    }else{
      console.log("Login failed:")
      return response.data
    }
    
  } catch (error) {
    return error;
  }
}
