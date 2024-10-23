import {INVENTORY} from "./index";

import { createClient } from "../../../plugins/axios";


export function getStock(params = {}) {
    return createClient().get(`${INVENTORY}stock/`, { params });
}

export function getProductStock(product_id,params = {}) {
    return createClient().get(`${INVENTORY}stock/product/${product_id}/`, { params });
}

export function getSingleTransaction(ID, params = {})    {
    return createClient().get(`${INVENTORY}${ID}/`, { params });
}

// export function deleteSupplier(ID) {
//     return createClient().delete(`${Supplier}/${ID}/`);
// }

// export function update(CategoryID, details) {
//     return createClient().put(`${Supplier}/${CategoryID}/`, details);
// }
