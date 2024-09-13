import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from 'formik';
import {postLogin} from './api/call'
import {setAccessToken, setRefreshToken, isAuthenticated} from "../../helpers";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password:  ''
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            postLogin(values).then((response)=>{
                const payload = response.data
                console.log(payload)
                setAccessToken(payload.access)
                setRefreshToken(payload.refresh)
                navigate('/category');
                toast.success('Login successful!');
            }).catch((error)=>{
                console.log(error)
                toast.error('Login fail'+ error.data);
            })
        },
    });

    // check if the user have access token or not
    // if (isAuthenticated){
    //     navigate('/category')
    // }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="p-4 rounded-3 bg-dark-subtle login_form">
                <h2 className="text-center mb-0">Volico Login</h2>
                <Form onSubmit={loginForm.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={loginForm.handleChange}
                            value={loginForm.values.email}
                        />
                        {/*<Form.Text className="text-muted">*/}
                        {/*    We'll never share your email with anyone else.*/}
                        {/*</Form.Text>*/}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={loginForm.handleChange}
                            value={loginForm.values.password}
                        />
                    </Form.Group>
                    <Button className="w-100 mb-3 btn-dark" as="input" type="submit" value="Login" />
                </Form>
            </div>
        </div>
    );
}

export default Login