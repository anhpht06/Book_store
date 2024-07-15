import axios from "axios";
export default async function STypeBook() {
  try {
    const res = await axios.get("http://localhost:3333/type-book");
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
