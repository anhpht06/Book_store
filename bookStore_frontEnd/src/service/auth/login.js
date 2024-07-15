import axios from "axios";
export default async function SLogin(email, password) {
  const data = { email: email, password: password };

  try {
    const respone = await axios.post("http://localhost:3333/user/login", data);
    return respone;
  } catch (error) {
    console.log(error);
  }
}
