import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Link, useNavigate, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getSingleCategory, postCategory, updateCategory} from "../api/call";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useQuery} from "@tanstack/react-query";
import * as Yup from 'yup';


const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const categoryForm = useFormik({
        initialValues: {
            id: null,
            name: '',
            description: '',
            is_active: true
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long')
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            if (id == null){
                handleAddCategory(values)
            }else{
                handleEditCategory(values)
            }

        },
    });

    const { data, error, isLoading } = useQuery({
        queryKey:['category', id],
        queryFn:() => {
            return getSingleCategory(id).then((response) => {
                categoryForm.setValues(response.data.data || categoryForm.values)
                return response.data.data
            }).catch((error) => {
                console.log(error)
                toast.error("Fail to fetch Data");
            })
        },
        enabled: !!id, // Only fetch if ID is provided
    });



    const handleAddCategory = (data) => {
        postCategory(data).then((response) => {
            navigate('/category');
            toast.success('Added Category Successfully!');
        }).catch((error) => {
            toast.error('Fail to add Category');
        })
    }
    const handleEditCategory = (data) => {
        updateCategory(data.id,data).then((response) => {
            navigate('/category');
            toast.success('Updated Category Successfully!');
        }).catch((error) => {
            toast.error('Fail to update Category');
        })
    }
    return (
        <>
            <h3 className="text-center mb-3">Category Form</h3>
            <Form onSubmit={categoryForm.handleSubmit}>
                <FloatingLabel className="mb-3" controlId="formName" label="Name">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={categoryForm.handleChange}
                        value={categoryForm.values.name}
                    />
                </FloatingLabel>
                {categoryForm.touched.name && categoryForm.errors.name ? (
                    <div className="text-danger mb-3">{categoryForm.errors.name}</div>
                ) : null}
                <FloatingLabel className="mb-3" controlId="categoryDescription" label="Description">
                    <Form.Control
                        as="textarea"
                        style={{height: '200px'}}
                        name="description"
                        placeholder="Enter Description"
                        onChange={categoryForm.handleChange}
                        value={categoryForm.values.description}
                    />
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="formActiveStatus">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active Status"
                        name="is_active"
                        onChange={categoryForm.handleChange}
                        value={categoryForm.values.is_active}
                        checked={categoryForm.values.is_active}
                    />
                </Form.Group>
                <Form.Group className="d-flex justify-content-end">
                    <Button className="mb-3 mx-2 btn btn-danger" as={Link} to="/category">Cancel</Button>
                    <Button className="mb-3 mx-2 btn btn-primary" as="input" type="submit" value="Submit"/>
                </Form.Group>
            </Form>
        </>
    );
}
export default CategoryForm;