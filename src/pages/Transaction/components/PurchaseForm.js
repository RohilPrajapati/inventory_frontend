import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { getProduct } from '../../Product/api/call';
import {getSupplier, postSupplier} from '../../Supplier/api/call';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link, useNavigate, useParams} from "react-router-dom";
import {postPurchase} from "../api/call";



const PurchaseForm = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const purchaseForm = useFormik({
        initialValues: {
            id: null,
            supplier: '',
            transaction_no: '',
            notes:'',
            transaction_item:[]
        },
        validationSchema: Yup.object({
            supplier: Yup.string()
                .required('Supplier is required'),
            transaction_no: Yup.string()
                .required('Transaction number is required'),
            notes: Yup.string(), // Assuming notes is optional
            transaction_item: Yup.array().of(
                Yup.object().shape({
                    qty: Yup.number()
                        .required('Quantity is required')
                        .min(1, 'Quantity must be at least 1'),
                    product: Yup.string()
                        .required('Product is required'), // Example of another field
                    price: Yup.number()
                        .required("price is required")
                        .min(1,'Price must be greater then Zero')
                })
            )
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            console.log("wokring")
            if (id == null) {
                console.log("working")
                handleCreatePurchase(values)
            } else {
                handleEditPurchase(values)
            }

        },
    });

    const handleCreatePurchase = (values) => {
        postPurchase(values).then((response) => {
            navigate('/purchase');
            toast.success('Added Purchase Successfully Successfully!');
        }).catch((error) => {
            console.log(error.response.data)
            purchaseForm.setErrors(error.response.data)
            toast.error('Fail to add Supplier');
        })
    }
    const handleEditPurchase = (values) => {

    }


    const {data: supplierData, error: supplierError, isLoading: supplierIsLoading} = useQuery({
        queryKey: ['fetchSupplier'],
        queryFn: () => {
            return getSupplier({'page_size': 1000}).then((response) => {
                console.log(response.data)
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });

    const {data: productData, error: productError, isLoading: productIsLoading} = useQuery({
        queryKey: ['fetchCategory'],
        queryFn: () => {
            return getProduct({'page_size': 1000}).then((response) => {
                console.log(response.data)
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });

    const addItem = () => {
        const items = [...purchaseForm.values.transaction_item]
        console.log(items)
        const newItem = {
            product:null,   // Or dynamically get product name from a form input
            qty:null,         // Or dynamically get price from a form input
            price:null
        };
        items.push(newItem);
        
        // Update the formik field value with the new array
        purchaseForm.setFieldValue('transaction_item', items);

        console.log(items);
    }
    const removeItem = (index) => {
        const items = [...purchaseForm.values.transaction_item]
        console.log(index)
        console.log(items[index])
        if (index > -1) { // only splice array when item is found
            items.splice(index, 1); // 2nd parameter means remove one item only
        }
        purchaseForm.setFieldValue('transaction_item', items);
    }

    return (
        <>
        <h3>Purchase Form</h3>
        <Form onSubmit={purchaseForm.handleSubmit}>
            <div className='d-flex mb-auto justify-content-between align-items-center'>
                <Form.Group className="mb-3 col-6" controlId="formBasicPassword">
                <FloatingLabel controlId="formName" label="Supplier">
                    <select
                        id="supplier"
                        name="supplier"
                        onChange={purchaseForm.handleChange}
                        onBlur={purchaseForm.handleBlur}
                        value={purchaseForm.values.supplier}
                        className="form-control btn-outline-dark"
                    >
                        <option value="">-- Select an option --</option>
                        {supplierData?.data && !supplierIsLoading && supplierData?.data.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </FloatingLabel>
                {purchaseForm.touched.supplier && purchaseForm.errors.supplier ? (
                    <div className="text-danger mb-3">{purchaseForm.errors.supplier}</div>
                ) : null}
                </Form.Group>
                <Form.Group className="mb-3 ps-3 col-6" controlId="formBasicPassword">
                    <Form.Label>Purchase Bill No</Form.Label>
                    <Form.Control type="text" placeholder="Enter Purchase Bill No"
                                  name="transaction_no"
                                  onChange={purchaseForm.handleChange}
                                  value={purchaseForm.values.transaction_no}/>
                    {purchaseForm.touched.transaction_no && purchaseForm.errors.transaction_no ? (
                        <div className="text-danger mb-3">{purchaseForm.errors.transaction_no}</div>
                    ) : null}
                </Form.Group>
            </div>
            <Button className='my-3' onClick={() => addItem()}>Add Item</Button>
            {purchaseForm?.values?.transaction_item && purchaseForm?.values?.transaction_item.map((item, index) => (
                <div key={index} className='d-flex justify-content-between align-items-center'>
                    <FloatingLabel className="col-3" controlId="formName" label="Product">
                        <select
                            id="product"
                            name={`transaction_item[${index}].product`}
                            onChange={purchaseForm.handleChange}
                            onBlur={purchaseForm.handleBlur}
                            value={purchaseForm.values.transaction_item[index].product}
                            className="form-control mb-3 btn-outline-dark"
                        >
                            <option value="">-- Select an option --</option>
                            {productData?.data && !productIsLoading && productData?.data.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {purchaseForm.touched.transaction_item?.[index]?.product && purchaseForm.errors.transaction_item?.[index]?.qty ? (
                            <div className="text-danger mb-3">{purchaseForm.errors.transaction_item?.[index]?.product}</div>
                        ) : null}
                    </FloatingLabel>
                    <FloatingLabel className="mb-3 col-3" controlId="formName" label="Quantity">
                        <Form.Control
                            type="number"
                            name={`transaction_item[${index}].qty`}
                            placeholder="Enter Quantity"
                            onChange={purchaseForm.handleChange}
                            value={purchaseForm.values.transaction_item[index].qty}
                        />
                        {purchaseForm.touched.transaction_item?.[index]?.qty && purchaseForm.errors.transaction_item?.[index]?.qty ? (
                            <div className="text-danger mb-3">{purchaseForm.errors.transaction_item?.[index]?.qty}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel className="mb-3 col-3" controlId="formName" label="Price">
                        <Form.Control
                            type="text"
                            name={`transaction_item[${index}].price`}
                            placeholder="Enter Name"
                            onChange={purchaseForm.handleChange}
                            value={purchaseForm.values.transaction_item[index].price}
                        />
                        {purchaseForm.touched.transaction_item?.[index]?.price && purchaseForm.errors.transaction_item?.[index]?.price ? (
                            <div className="text-danger mb-3">{purchaseForm.errors.transaction_item?.[index]?.price}</div>
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
                    onChange={purchaseForm.handleChange}
                    value={purchaseForm.values.notes}
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

export default PurchaseForm