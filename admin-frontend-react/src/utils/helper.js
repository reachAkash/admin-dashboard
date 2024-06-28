import axios from "axios";

export const baseUrl = "http://localhost:3000/";
export async function fetchData(url) {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
}
