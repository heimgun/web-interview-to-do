import axios from "axios";

export const client = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: {
        Accept: "application/json",
    },
});