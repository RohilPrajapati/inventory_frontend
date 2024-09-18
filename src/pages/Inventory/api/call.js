import {INVENTORY} from "./index";

import { createClient } from "../../../plugins/axios";

export function postPurchase(data) {
    return createClient().post(`${INVENTORY}purchase/`, data);
}

export function postSales(data) {
    return createClient().post(`${INVENTORY}sales/`, data);
}

export function getStock(params = {}) {
    return createClient().get(`${INVENTORY}stock/`, { params });
}

export function getSingleTransaction(ID, params = {}) {
    return createClient().get(`${INVENTORY}${ID}/`, { params });
}

// export function deleteSupplier(ID) {
//     return createClient().delete(`${Supplier}/${ID}/`);
// }

// export function update(CategoryID, details) {
//     return createClient().put(`${Supplier}/${CategoryID}/`, details);
// }
