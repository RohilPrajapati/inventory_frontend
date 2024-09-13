import { Supplier } from "./index";
// import axios from 'axios'
import { createClient } from "../../../plugins/axios";

export function postSupplier(data) {
    return createClient().post(`${Supplier}/`, data);
}

export function updateSupplier(CategoryID, details) {
    return createClient().put(`${Supplier}/${CategoryID}/`, details);
}

export function getSupplier(params = {}) {
    return createClient().get(`${Supplier}/`, { params });
}

export function getSingleSupplier(ID, params = {}) {
    return createClient().get(`${Supplier}/${ID}/`, { params });
}

export function deleteSupplier(ID) {
    return createClient().delete(`${Supplier}/${ID}/`);
}
