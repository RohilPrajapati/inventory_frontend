import { Product } from "./index";
// import axios from 'axios'
import { createClient } from "../../../plugins/axios";

export function postProduct(data) {
    return createClient().post(`${Product}/`, data);
}

export function updateProduct(CategoryID, details) {
    return createClient().put(`${Product}/${CategoryID}/`, details);
}

export function getProduct(params = {}) {
    return createClient().get(`${Product}/`, { params });
}

export function getProductWithStock(params = {}) {
    return createClient().get(`${Product}/stock/`, { params });
}

export function getSingleProduct(ID, params = {}) {
    return createClient().get(`${Product}/${ID}/`, { params });
}

export function deleteProduct(ID) {
    return createClient().delete(`${Product}/${ID}/`);
}
