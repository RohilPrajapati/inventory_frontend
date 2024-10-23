import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { getProductWithStock } from '../../Product/api/call';
import {getProductStock} from '../../Inventory/api/call';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import { useNavigate, useParams} from "react-router-dom";
import {postSales} from "../api/call";
import {useState} from "react";




const SalesForm = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [stockLists, setStockLists] = useState({});
    const [startDate,setStartDate] =useState()
    const salesForm = useFormik({
        initialValues: {
            id: null,
            supplier: '',
            transaction_no: '',
            notes:'',
            transaction_item:[]
        },
        validationSchema: Yup.object({
            notes: Yup.string(), // Assuming notes is optional
            transaction_item: Yup.array().of(
                Yup.object().shape({
                    qty: Yup.number()
                        .required('Quantity is required')
                        .min(1, 'Quantity must be at least 1')
                        .test('is-less-than-available', 'Order quantity cannot exceed available quantity', function(value) {
                            return value <= this.parent.available_qty; // Validate against available quantity
                        }),
                    product: Yup.string()
                        .required('Product is required'), // Example of another field
                    stock: Yup.number()
                        .required("Stock is required"),
                    price: Yup.number()
                        .required("Price is required")
                        .min(1,'Price must be greater then Zero')
                })
            )
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            console.log("working")
            if (id == null) {
                console.log("working")
                handleCreateSales(values)
            } else {
                handleEditSales(values)
            }

        },
    });

    const handleCreateSales = (values) => {
        postSales(values).then((response) => {
            navigate('/sales');
            toast.success('Added Purchase Successfully Successfully!');
        }).catch((error) => {
            console.log(error.response.data)
            salesForm.setErrors(error.response.data)
            toast.error('Fail to add Supplier');
        })
    }
    const handleEditSales = (values) => {

    }
    const handleProductChange = async (e, index) => {
        const productId = e.target.value;

        // Update the product in formik
        await salesForm.setFieldValue(`transaction_item[${index}].product`, productId);

        // Fetch the stock list only for this product and store it by the current item index
        if (productId) {
            let stocks
            await getProductStock(productId).then((response) => {

               stocks  = response.data
                console.log(stocks)
            }).catch((error)=> {
                toast.error('Fail to Fetch data');
                return error.data;
            });

            // Set stock list for the specific item
            await setStockLists((prev) => ({
                ...prev,
                [index]: stocks // Only store stock list for the specific item index
            }));
            console.log("stock list",stockLists)
            // Clear any previously selected stock for this item (since the product has changed)
            await salesForm.setFieldValue(`transaction_item[${index}].stock`, '');
        }
    };

    const handleStockChange = (e,index) => {
        const stockId = e.target.value;
        console.log(stockLists[index])
        let foundStock = stockLists[index].find(item => item?.id === parseInt(stockId));
        // Object.keys(stockLists).forEach(key => {
        //     const foundItem = stockLists[key].find(item => item?.stock?.id === parseInt(stockId));
        //     if (foundItem) {
        //         foundStock = foundItem;
        //     }
        // });
        console.log(foundStock)
        salesForm.setFieldValue(`transaction_item[${index}].stock`, stockId);
        salesForm.setFieldValue(`transaction_item[${index}].price`, foundStock?.sales_price);
        salesForm.setFieldValue(`transaction_item[${index}].available_qty`, foundStock?.quantity_in_stock);
    }

    const {data: productData, error: productError, isLoading: productIsLoading} = useQuery({
        queryKey: ['fetchCategory'],
        queryFn: () => {
            return getProductWithStock({'page_size': 1000}).then((response) => {
                console.log(response.data)
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });

    const addItem = () => {
        const items = [...salesForm.values.transaction_item]
        console.log(items)
        const newItem = {
            product:null,   // Or dynamically get product name from a form input
            available_qty:null,
            qty:null,         // Or dynamically get price from a form input
            price:null,
        };
        items.push(newItem);

        // Update the formik field value with the new array
        salesForm.setFieldValue('transaction_item', items);

        console.log(items);
    }
    const removeItem = (index) => {
        const items = [...salesForm.values.transaction_item]
        console.log(index)
        console.log(items[index])
        if (index > -1) { // only splice array when item is found
            items.splice(index, 1); // 2nd parameter means remove one item only
        }
        salesForm.setFieldValue('transaction_item', items);
    }

    return (
        <>
            <h3>Sales Form</h3>
            <Form onSubmit={salesForm.handleSubmit}>
                <Button className='my-3' onClick={() => addItem()}>Add Item</Button>
                {salesForm?.values?.transaction_item && salesForm?.values?.transaction_item.map((item, index) => (
                    <div key={index} className='d-flex justify-content-between align-items-center'>
                        <FloatingLabel className="col-3" controlId="formName" label="Product">
                            <select
                                id="product"
                                name={`transaction_item[${index}].product`}
                                onChange={(e) => handleProductChange(e,index)}
                                onBlur={salesForm.handleBlur}
                                value={salesForm.values.transaction_item[index].product}
                                className="form-control mb-3 btn-outline-dark"
                            >
                                <option value="">-- Select an option --</option>
                                {productData?.data && !productIsLoading && productData?.data.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {salesForm.touched.transaction_item?.[index]?.product && salesForm.errors.transaction_item?.[index]?.qty ? (
                                <div className="text-danger mb-3">{salesForm.errors.transaction_item?.[index]?.product}</div>
                            ) : null}
                        </FloatingLabel>
                        <FloatingLabel className="col-3" controlId="formName" label="Stock">
                            <select
                                id="product"
                                name={`transaction_item[${index}].stock`}
                                onChange={(e) => handleStockChange(e,index)}
                                onBlur={salesForm.handleBlur}
                                value={salesForm.values.transaction_item[index].stock}
                                className="form-control mb-3 btn-outline-dark"
                            >
                                <option value="">-- Select an option --</option>
                                {stockLists?.[index] && stockLists?.[index]?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {`${item.product.name} ${index} (SKU: ${item.product.sku}) - Stock: ${item.quantity_in_stock}`}
                                        </option>
                                    ))
                                }

                            </select>
                            {salesForm.touched.transaction_item?.[index]?.product && salesForm.errors.transaction_item?.[index]?.qty ? (
                                <div className="text-danger mb-3">{salesForm.errors.transaction_item?.[index]?.product}</div>
                            ) : null}
                        </FloatingLabel>
                        <FloatingLabel className="mb-3 col-2" controlId="formName" label="Available Quantity">
                            <Form.Control
                                type="number"
                                name={`transaction_item[${index}].available_qty`}
                                placeholder="Enter Quantity"
                                onChange={salesForm.handleChange}
                                value={salesForm.values.transaction_item[index].available_qty}
                                readOnly
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3 col-1" controlId="formName" label="Quantity">
                            <Form.Control
                                type="number"
                                name={`transaction_item[${index}].qty`}
                                placeholder="Enter Quantity"
                                onChange={salesForm.handleChange}
                                value={salesForm.values.transaction_item[index].qty}
                            />
                            {salesForm.touched.transaction_item?.[index]?.qty && salesForm.errors.transaction_item?.[index]?.qty ? (
                                <div className="text-danger mb-3">{salesForm.errors.transaction_item?.[index]?.qty}</div>
                            ) : null}
                        </FloatingLabel>

                        <FloatingLabel className="mb-3 col-1" controlId="formName" label="Price">
                            <Form.Control
                                type="text"
                                name={`transaction_item[${index}].price`}
                                placeholder="Enter Name"
                                onChange={salesForm.handleChange}
                                value={salesForm.values.transaction_item[index].price}
                            />
                            {salesForm.touched.transaction_item?.[index]?.price && salesForm.errors.transaction_item?.[index]?.price ? (
                                <div className="text-danger mb-3">{salesForm.errors.transaction_item?.[index]?.price}</div>
                            ) : null}
                        </FloatingLabel>

                        <div className="mb-3">
                            <div className="btn btn-danger" onClick={() => removeItem(index)}>Delete</div>
                        </div>
                    </div>

                ))}
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                              name="notes"
                              onChange={salesForm.handleChange}
                              value={salesForm.values.notes}
                    ></textarea>
                </div>
                {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                {/*    <Form.Check type="checkbox" label="Check me out"/>*/}
                {/*</Form.Group>*/}
                <Button className="mb-3 mx-2 btn btn-primary" as="input" type="submit" value="Submit"/>
            </Form>
        </>
    );
}

export default SalesForm