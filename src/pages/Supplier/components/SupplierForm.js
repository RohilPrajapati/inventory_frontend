import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Link, useNavigate, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getSingleSupplier, postSupplier, updateSupplier} from "../api/call";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useQuery} from "@tanstack/react-query";
import * as Yup from 'yup';


const SupplierForm = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const supplierForm = useFormik({
        initialValues: {
            id: null,
            name: '',
            email: '',
            phone_number: '',
            address: '',
            city: null,
            state: null,
            postal_code: null,
            country: null,
            is_active: true
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long'),
            email: Yup.string().required('Email is required').email("Invalid Email address"),
            phone_number: Yup.string().required("Phone Number is required")
                .min(6,"Phone number must be greater 6 digit")
                .max(9999999999,"Phone number must be less then 15 digit")

        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            if (id == null){
                handleAddSupplier(values)
            }else{
                handleEditSupplier(values)
            }

        },
    });

    const { data, error, isLoading } = useQuery({
        queryKey:['supplier', id],
        queryFn:() => {
            return getSingleSupplier(id).then((response) => {
                supplierForm.setValues(response.data.data || supplierForm.values)
                return response.data.data
            }).catch((error) => {
                console.log(error)
                toast.error("Fail to fetch Data");
            })
        },
        enabled: !!id, // Only fetch if ID is provided
    });



    const handleAddSupplier = (data) => {
        postSupplier(data).then((response) => {
            navigate('/supplier');
            toast.success('Added Supplier Successfully!');
        }).catch((error) => {
            console.log(error.response.data)
            supplierForm.setErrors(error.response.data)
            toast.error('Fail to add Supplier');
        })
    }
    const handleEditSupplier = (data) => {
        updateSupplier(data.id,data).then((response) => {
            navigate('/supplier');
            toast.success('Updated Supplier Successfully!');
        }).catch((error) => {
            toast.error('Fail to update Supplier');
        })
    }
    return (
        <>
            <h3 className="text-center mb-3">Supplier Form</h3>
            <Form onSubmit={supplierForm.handleSubmit}>
                <FloatingLabel className="mb-3" controlId="formName" label="Name">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.name}
                    />
                </FloatingLabel>
                {supplierForm.touched.name && supplierForm.errors.name ? (
                    <div className="text-danger mb-3">{supplierForm.errors.name}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Email">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.email}
                    />
                </FloatingLabel>
                {supplierForm.touched.email && supplierForm.errors.email ? (
                    <div className="text-danger mb-3">{supplierForm.errors.email}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Phone Number">
                    <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder="Enter Phone Number"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.phone_number}
                    />
                </FloatingLabel>
                {supplierForm.touched.phone_number && supplierForm.errors.phone_number ? (
                    <div className="text-danger mb-3">{supplierForm.errors.phone_number}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Address">
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.address}
                    />
                </FloatingLabel>
                {supplierForm.touched.address && supplierForm.errors.address ? (
                    <div className="text-danger mb-3">{supplierForm.errors.address}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="City (Optional)">
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.city}
                    />
                </FloatingLabel>
                {supplierForm.touched.city && supplierForm.errors.city ? (
                    <div className="text-danger mb-3">{supplierForm.errors.city}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="State (Optional)">
                    <Form.Control
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.state}
                    />
                </FloatingLabel>
                {supplierForm.touched.state && supplierForm.errors.state ? (
                    <div className="text-danger mb-3">{supplierForm.errors.state}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Postal Code (Optional)">
                    <Form.Control
                        type="text"
                        name="postal_code"
                        placeholder="Enter Postal Code"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.postal_code}
                    />
                </FloatingLabel>
                {supplierForm.touched.postal_code && supplierForm.errors.postal_code ? (
                    <div className="text-danger mb-3">{supplierForm.errors.postal_code}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Contry (Optional)">
                    <Form.Control
                        type="text"
                        name="country"
                        placeholder="Enter Country"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.country}
                    />
                </FloatingLabel>
                {supplierForm.touched.country && supplierForm.errors.country ? (
                    <div className="text-danger mb-3">{supplierForm.errors.country}</div>
                ) : null}
                <Form.Group className="mb-3" controlId="formActiveStatus">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active Status"
                        name="is_active"
                        onChange={supplierForm.handleChange}
                        value={supplierForm.values.is_active}
                        checked={supplierForm.values.is_active}
                    />
                </Form.Group>
                <Form.Group className="d-flex justify-content-end">
                    <Button className="mb-3 mx-2 btn btn-danger" as={Link} to="/supplier">Cancel</Button>
                    <Button className="mb-3 mx-2 btn btn-primary" as="input" type="submit" value="Submit"/>
                </Form.Group>
            </Form>
        </>
    );
}
export default SupplierForm;