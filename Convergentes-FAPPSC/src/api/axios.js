import axios from "axios";

const instace = axios.create({
  baseURL: "http://172.21.162.162:3000/api",
  withCredentials: true,
});

export default instace;
