import { Transaction } from "./index";

import { createClient } from "../../../plugins/axios";

export function postPurchase(data) {
    return createClient().post(`${Transaction}purchase/`, data);
}

export function postSales(data) {
    return createClient().post(`${Transaction}sales/`, data);
}

export function getTransaction(params = {}) {
    return createClient().get(`${Transaction}`, { params });
}

export function getSingleTransaction(ID, params = {}) {
    return createClient().get(`${Transaction}/${ID}/`, { params });
}

// export function deleteSupplier(ID) {
//     return createClient().delete(`${Supplier}/${ID}/`);
// }

// export function update(CategoryID, details) {
//     return createClient().put(`${Supplier}/${CategoryID}/`, details);
// }
