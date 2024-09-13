import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {getSingleProduct, postProduct, updateProduct} from "../api/call";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useQuery} from "@tanstack/react-query";
import * as Yup from 'yup';
import {getCategory} from "../../Category/api/call";
import {useState} from "react";
import {API_HOST} from "../../../configs";


const ProductForm = () => {
    const {id} = useParams();
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null);
    const {data: categoryData, error: categoryError, isLoading: categoryIsLoading} = useQuery({
        queryKey: ['fetchCategory'],
        queryFn: () => {
            return getCategory({'page_size': 1000}).then((response) => {
                console.log(response.data)
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });

    const productForm = useFormik({
        initialValues: {
            id: null,
            name: '',
            description: '',
            category: '',
            brand: null,
            sku: '',
            upc: '',
            weight: null,
            dimensions: '',
            color: '',
            size: '',
            is_active: true,
            image: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long')
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            if (id == null) {
                handleAddProduct(values)
            } else {
                handleEditProduct(values)
            }

        },
    });

    useQuery({
        queryKey: ['product', id],
        queryFn: () => {
            return getSingleProduct(id).then((response) => {
                productForm.setValues(response.data.data || productForm.values)
                setPreview(API_HOST+response.data.data.image)
                return response.data.data
            }).catch((error) => {
                console.log(error)
                toast.error("Fail to fetch Data");
            })
        },
        enabled: !!id, // Only fetch if ID is provided
    });


    const handleAddProduct = (data) => {
        const formData = new FormData();
        for (const key in data) {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        }
        // for (let key in data){
        //     if (data[key]) {
        //         // if (key === 'image') {
        //         //     // Handle file separately
        //         //     formData.append(key, values[key]);
        //         // } else {
        //             // Handle text fields
        //             formData.append(key, data[key]);
        //         }
        // }

        postProduct(formData).then((response) => {
            navigate('/product');
            toast.success('Added Product Successfully!');
        }).catch((error) => {
            toast.error('Fail to add Product');
        })
    }
    const handleEditProduct = (data) => {
        if(typeof data?.image === 'string' || data?.image instanceof String){
            delete data?.image
        }
        updateProduct(data.id, data).then((response) => {
            navigate('/product');
            toast.success('Updated Product Successfully!');
        }).catch((error) => {
            toast.error('Fail to update Product');
        })
    }

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         productForm.setValues({...productForm.values,image:file});
    //         setPreview(URL.createObjectURL(file));
    //     }
    // };
    const handleImageChange = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0];
        if (file) {
            productForm.setFieldValue('image', file);
            console.log(productForm)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemoveImage = () => {
        productForm.setValues({...productForm.values,image: null});
        setPreview(null);
    };

    return (
        <>
            <h3 className="text-center mb-3">Product Form</h3>
            <Form onSubmit={productForm.handleSubmit}>
                <FloatingLabel className="mb-3" controlId="formName" label="Name">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={productForm.handleChange}
                        value={productForm.values.name}
                    />
                </FloatingLabel>
                {productForm.touched.name && productForm.errors.name ? (
                    <div className="text-danger mb-3">{productForm.errors.name}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="categoryDescription" label="Description">
                    <Form.Control
                        as="textarea"
                        style={{height: '200px'}}
                        name="description"
                        placeholder="Enter Description"
                        onChange={productForm.handleChange}
                        value={productForm.values.description}
                    />
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="formName" label="Category">
                    <select
                        id="dropdown"
                        name="category"
                        onChange={productForm.handleChange}
                        onBlur={productForm.handleBlur}
                        value={productForm.values.category}
                        className="form-control mb-3 btn-outline-dark"
                    >
                        <option value="">-- Select an option --</option>
                        {categoryData?.data && !categoryIsLoading && categoryData?.data.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="formName" label="Weight">
                    <Form.Control
                        type="text"
                        name="weight"
                        placeholder="Enter Address"
                        onChange={productForm.handleChange}
                        value={productForm.values.weight}
                    />
                </FloatingLabel>
                {productForm.touched.weight && productForm.errors.weight ? (
                    <div className="text-danger mb-3">{productForm.errors.weight}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Dimensions">
                    <Form.Control
                        type="text"
                        name="dimensions"
                        placeholder="Enter Address"
                        onChange={productForm.handleChange}
                        value={productForm.values.dimensions}
                    />
                </FloatingLabel>
                {productForm.touched.dimensions && productForm.errors.dimensions ? (
                    <div className="text-danger mb-3">{productForm.errors.dimensions}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Color">
                    <Form.Control
                        type="text"
                        name="color"
                        placeholder="Enter Name"
                        onChange={productForm.handleChange}
                        value={productForm.values.color}
                    />
                </FloatingLabel>
                {productForm.touched.color && productForm.errors.color ? (
                    <div className="text-danger mb-3">{productForm.errors.color}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="Size">
                    <Form.Control
                        type="text"
                        name="size"
                        placeholder="Enter Name"
                        onChange={productForm.handleChange}
                        value={productForm.values.size}
                    />
                </FloatingLabel>
                {productForm.touched.size && productForm.errors.size ? (
                    <div className="text-danger mb-3">{productForm.errors.size}</div>
                ) : null}
                <Form.Group className="mb-3" controlId="formActiveStatus">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active Status"
                        name="is_active"
                        onChange={productForm.handleChange}
                        value={productForm.values.is_active}
                        checked={productForm.values.is_active}
                    />
                </Form.Group>
                <FloatingLabel className="mb-3" controlId="formName" label="SKU">
                    <Form.Control
                        type="text"
                        name="sku"
                        placeholder="Enter Name"
                        onChange={productForm.handleChange}
                        value={productForm.values.sku}
                    />
                </FloatingLabel>
                {productForm.touched.sku && productForm.errors.sku ? (
                    <div className="text-danger mb-3">{productForm.errors.sku}</div>
                ) : null}


                {productForm.touched.category && productForm.errors.category ? (
                    <div className="text-danger mb-3">{productForm.errors.category}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="formName" label="UPC">
                    <Form.Control
                        type="text"
                        name="upc"
                        placeholder="Enter Name"
                        onChange={productForm.handleChange}
                        value={productForm.values.upc}
                    />
                </FloatingLabel>
                {productForm.touched.upc && productForm.errors.upc ? (
                    <div className="text-danger mb-3">{productForm.errors.upc}</div>
                ) : null}
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload an Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>

                {preview && (
                    <div className="mb-3">
                        <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                        <Button variant="danger" onClick={handleRemoveImage} className="mt-2">
                            Remove Image
                        </Button>
                    </div>
                )}
                <Form.Group className="d-flex justify-content-end">
                    <Button className="mb-3 mx-2 btn btn-danger" as={Link} to="/product">Cancel</Button>
                    <Button className="mb-3 mx-2 btn btn-primary" as="input" type="submit" value="Submit"/>
                </Form.Group>
            </Form>
        </>
    );
}
export default ProductForm;