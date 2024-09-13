import { Category } from "./index";
// import axios from 'axios'
import { createClient } from "../../../plugins/axios";

export function postCategory(data) {
    return createClient().post(`${Category}/`, data);
}

export function updateCategory(CategoryID, details) {
    return createClient().put(`${Category}/${CategoryID}/`, details);
}

export function getCategory(params = {}) {
    return createClient().get(`${Category}/`, { params });
}

export function getSingleCategory(ID, params = {}) {
    return createClient().get(`${Category}/${ID}/`, { params });
}

export function deleteCategory(ID) {
    return createClient().delete(`${Category}/${ID}/`);
}
