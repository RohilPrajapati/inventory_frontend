import { Login } from "./index";
import axios from 'axios'
// import { createClient } from "../../../plugins/axios";

export function postLogin(data) {
    return axios.post(`${Login}`, data);
}