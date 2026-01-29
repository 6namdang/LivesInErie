import axios from 'axios';

export const http = axios.create({
    baseURL : "https://java-application-latest-be2q.onrender.com/api",
    timeout : 10000,
    headers : {
        "Content-Type" : 'application/json'
    }
})

