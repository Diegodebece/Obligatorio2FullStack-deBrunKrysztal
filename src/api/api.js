import axios from "axios";

const api = axios.create({
    baseURL: "https://obligatorio-full-stack-de-brun-krys.vercel.app/v1",
})

export default api;