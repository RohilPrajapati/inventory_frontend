import { DASHBOARD } from "./index";
// import axios from 'axios'
import { createClient } from "../../../plugins/axios";



export function getDashboard(params = {}) {
    return createClient().get(`${DASHBOARD}/`, { params });
}

// export function getSingleCategory(ID, params = {}) {
//     return createClient().get(`${DASHBOARD}/${ID}/`, { params });
// }

